import { app } from "electron";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { notifyCoursesUpdate, notifyCourseUpdate } from "./coursesNotifier";

export type Course = {
  id: string;
  title: string;
};

/**
 * This class manages the courses in the application.
 */
class CoursesManager {
  courses: Course[];
  filePath: string;
  static instance: CoursesManager = null;

  constructor(courses: Course[], filePath: string) {
    this.courses = courses;
    this.filePath = filePath;
  }

  /**
   * Get the instance of the CoursesManager.
   * @returns The instance of the CoursesManager.
   */
  static async getInstance() {
    if (this.instance === null) {
      const filePath = path.join(app.getPath("userData"), "courses.json");
      if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath, "utf-8");
        const { courses } = JSON.parse(file);
        this.instance = new this(courses, filePath);
      } else {
        fs.writeFileSync(filePath, JSON.stringify({ courses: [] }));
        this.instance = new this([], filePath);
      }
    }
    return this.instance;
  }

  /**
   * Add a course to the list of courses.
   * @param courseTitle The title of the course.
   * @returns The list of courses.
   */
  addCourse(courseTitle: string) {
    const course = {
      id: uuidv4(),
      title: courseTitle,
    };
    this.courses.push(course);
    this.save();
    notifyCourseUpdate(course);
    notifyCoursesUpdate(this.courses);
    return this.courses;
  }

  /**
   * Remove a course from the list of courses.
   * @param courseId The id of the course to remove.
   * @returns The list of courses.
   */
  removeCourse(courseId: string) {
    this.courses = this.courses.filter((course) => course.id !== courseId);
    this.save();
    const courseFolderPath = path.join(
      app.getPath("userData"),
      "courses",
      courseId
    );
    if (fs.existsSync(courseFolderPath))
      fs.rmSync(courseFolderPath, { recursive: true });
    notifyCoursesUpdate(this.courses);
    return this.courses;
  }

  /**
   * Update a course in the list of courses.
   * @param course The course to update.
   * @returns The list of courses.
   */
  updateCourse(course: Course) {
    this.courses = this.courses.map((c) => {
      if (c.id === course.id) {
        return course;
      }
      return c;
    });
    this.save();
    notifyCourseUpdate(course);
    notifyCoursesUpdate(this.courses);
    return this.courses;
  }

  /**
   * Get the details of a course.
   * @param courseId
   * @returns details of the course
   */
  getCourse(courseId: string) {
    return this.courses.find((course) => course.id === courseId);
  }

  /**
   * Get the list of courses.
   * @returns The list of courses.
   */
  getCourses() {
    return this.courses;
  }

  /**
   * Save the courses to the file.
   */
  save() {
    fs.writeFileSync(this.filePath, JSON.stringify({ courses: this.courses }));
  }
}

export const addCourse = async (courseTitle: string) => {
  const coursesManager = await CoursesManager.getInstance();
  return coursesManager.addCourse(courseTitle);
};

export const removeCourse = async (courseId: string) => {
  const coursesManager = await CoursesManager.getInstance();
  return coursesManager.removeCourse(courseId);
};

export const updateCourse = async (course: Course) => {
  const coursesManager = await CoursesManager.getInstance();
  return coursesManager.updateCourse(course);
};

export const getCourse = async (courseId: string) => {
  const coursesManager = await CoursesManager.getInstance();
  return coursesManager.getCourse(courseId);
};

export const getCourses = async () => {
  const coursesManager = await CoursesManager.getInstance();
  return coursesManager.getCourses();
};
