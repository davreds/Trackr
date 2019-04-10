
$.ajax({
    url: "data/projects.json",
    type: "GET",
    dataType: "json",
    success: function(data){
        let projectSpace = "";

        for(let i=0; i<data.length; i++){
            projectSpace += `
            <div class="project">
                <div class="projectHead"><span><h1 class="projectTitle">${data[i].Title}</h1></span><span><p>Due Date: ${data[i].DueDate}</p></span></div>
                <div class="">
                    <ul>
            `;
            for(let j=0; j<data[i].Tasks.length; j++){
                projectSpace += `
                        <li><h2 class="taskName">${data[i].Tasks[j].Name}</h2>
                        <p class="taskDesc">${data[i].Tasks[j].Description}</p></li>
                `;
            }
            projectSpace += `
                    </ul>
                </div>
            </div>
            `;
        }
        console.log(projectSpace);
        $("#projectSpace").append(projectSpace);
    },
    error: function(error_msg){
        console.log(error_msg);
    }
})
