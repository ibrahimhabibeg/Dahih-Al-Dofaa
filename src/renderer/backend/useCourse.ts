import { useEffect, useState } from "react";

const useCourse = (courseId: string) => {
  const [course, setCourse] = useState<Course>({
    id: courseId,
    title: "",
  });

  useEffect(() => {
    window.api.course.get(courseId).then((course) => {
      setCourse(course);
    });

    window.api.course.subscribeToCourse(courseId, (_, course) => {
      setCourse(course);
    });

    return () => {
      window.api.course.unsubscribeFromCourse(courseId);
    };
  }, [courseId]);

  return course;
};

export default useCourse;
