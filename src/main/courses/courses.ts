import { app } from "electron";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

type course = {
  id: string;
  title: string;
};

class CoursesManager {
  courses: course[];
  filePath: string;
  static instance: CoursesManager;

  constructor(courses: course[], filePath: string) {
    this.courses = courses;
    this.filePath = filePath;
  }

  static async getInstance() {
    if (this.instance === null) {
      const filePath = path.join(app.getPath("userData"), "courses.json");
      if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath, "utf-8");
        const { courses } = JSON.parse(file);
        this.instance = new this(courses, filePath);
      }else{
        fs.writeFileSync(filePath, JSON.stringify({ courses: [] }));
        this.instance = new this([], filePath);
      }
    }
    return this.instance;
  }

  addCourse(courseTitle: string) {
    const course = {
      id: uuidv4(),
      title: courseTitle,
    };
    this.courses.push(course);
    this.save();
  }

  removeCourse(courseId: string) {
    this.courses = this.courses.filter((course) => course.id !== courseId);
    this.save();
  }

  updateCourse(course: course) {
    this.courses = this.courses.map((c) => {
      if (c.id === course.id) {
        return course;
      }
      return c;
    });
    this.save();
  }

  getCourse(courseId: string) {
    return this.courses.find((course) => course.id === courseId);
  }

  getCourses() {
    return this.courses;
  }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify({ courses: this.courses }));
  }
}

export const addCourse = async (courseTitle: string) => {
  const coursesManager = await CoursesManager.getInstance();
  coursesManager.addCourse(courseTitle);
}

export const removeCourse = async (courseId: string) => {
  const coursesManager = await CoursesManager.getInstance();
  coursesManager.removeCourse(courseId);
}

export const updateCourse = async (course: course) => {
  const coursesManager = await CoursesManager.getInstance();
  coursesManager.updateCourse(course);
}