import React from "react";
import Course from "./components/course";

const App = () => {
	// const rndNum = Math.floor(Math.random() * 50) + 1 

	const courses = [
		{
		  name: 'Half Stack application development',
		  id: 1,
		  parts: [
			{
			  name: 'Fundamentals of React',
			  exercises: 10,
			  id: 1
			},
			{
			  name: 'Using props to pass data',
			  exercises: 7,
			  id: 2
			},
			{
			  name: 'State of a component',
			  exercises: 14,
			  id: 3
			},
			{
			  name: 'Redux',
			  exercises: 11,
			  id: 4
			}
		  ]
		}, 
		{
		  name: 'Node.js',
		  id: 2,
		  parts: [
			{
			  name: 'Routing',
			  exercises: 3,
			  id: 1
			},
			{
			  name: 'Middlewares',
			  exercises: 7,
			  id: 2
			}
		  ]
		},
		{
		  name: 'Deno',
		  id: 3,
		  parts: [
			{
			  name: 'course one',
			  exercises: 7,
			  id: 1
			},
			{
			  name: 'course two',
			  exercises: 15,
			  id: 2
			}
		  ]
		}
		]	
	
	  return (
			//iterate courses
			<>
				{courses.map(course => 
					< Course key={course.id} course={course} />
				)}
			</>
	  )
	}

export default App;