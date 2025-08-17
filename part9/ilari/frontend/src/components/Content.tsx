import type { DiaryEntry } from "../types";

export default function Content({diaries}:{diaries: DiaryEntry[]}){
    return(
        <div>
            {diaries.map(diary=>(
                <div key={diary.id}>
                    <h2>{diary.date}</h2>
                    <p>visibility: {diary.visibility}</p>
                    <p>weather {diary.weather}</p>
                    <p>{diary.comment}</p>
                </div>
            ))}
        </div>
    )
}