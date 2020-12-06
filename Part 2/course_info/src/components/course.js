const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    const cList = course.parts
    return (
      <>
        {cList.map(courseList => 
          <Part key={courseList.id} part={courseList}/>
        )}
      </>
    )
  }
  
  const Total = ({ course }) => {
      const partArray = course.parts.map(onePart => onePart.exercises)
    const sum = partArray.reduce((s, p) => s + p)
      console.log(partArray)
      
      return(
          <h4>Total of {sum} exercises</h4>
      ) 
  }
  
  const course = ({course}) => {
      console.log(course)
      return(
          <>
              <Header course={course} />
              <Content course={course} />
              <Total course={course} />
          </>
      );
  }

  export default course;