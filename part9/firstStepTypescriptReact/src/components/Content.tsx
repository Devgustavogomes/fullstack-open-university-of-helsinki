import type { CoursePart } from "../interfaces/courseParts.interface";

interface ContentProp{
    courseParts: CoursePart[]
}

export default function Content({courseParts}: ContentProp){
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    function renderBykind(course: CoursePart){
        switch (course.kind) {
            case 'basic':
                return(
                    <div>
                        <h3>{course.name}</h3>
                        <i>{course.description}</i>
                    </div>
                )
            case 'group':
                return(
                    <div>
                        <h3>{course.name}</h3>
                        <p>project exercises: {course.groupProjectCount}</p>
                    </div>
                )
            case 'background':
                return(
                    <div>
                        <h3>{course.name}</h3>
                        <i>{course.description}</i>
                        <p>{course.backgroundMaterial}</p>
                    </div>
                )
            case 'special':
                return(
                    <div>
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                        <p>required skills: {course.requirements.join(', ')}</p>
                    </div>
                )
        
            default:
                return assertNever(course)
        }
    }
    return(
        <div>
            {courseParts.map(course =>{
                return(
                    <div key={course.name}>
                        {renderBykind(course)}
                    </div>
                )
            })}
        </div>
    )


}

