const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map(part => 
            <div key={part.id}>
              {part.name} {part.exercises}
            </div>
          )}
          <b>total of {course.parts.reduce(
            (accumulator, currentValue) => accumulator + currentValue.exercises,
            0,
          )} exercises</b>
        </div>
      )}
    </div>
  )
}

export default Course