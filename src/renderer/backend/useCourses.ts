import { useState, useEffect } from "react";

const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    window.api.course.getAll().then((courses) => {
      setCourses(courses);
    });

    window.api.course.subscribeToAllCourses((_, courses) => {
      setCourses(courses);
    });

    return () => {
      window.api.course.unsubscribeFromAllCourses();
    };
  }, []);

  return courses;
};

export default useCourses;
