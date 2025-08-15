import type { coursePart } from "../interfaces/courseParts.interface";

interface ContentProp{
    courseParts: coursePart[]
}

export default function Content({courseParts}: ContentProp){
    return(
        <div>
            {courseParts.map(course =>{
                return(
                    <div key={course.name}>
                        <p>{course.name} - {course.exerciseCount}</p>
                    </div>
                )
            })}
        </div>
    )


}

