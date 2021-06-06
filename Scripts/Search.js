var lst_skill = [];

$(document).ready(function(){
    q = window.location.href.split('?q=')[1]
    let query_string;
    if(q.split('%20').length != 0){
        query_string = q.replace('%20',' ');
    }
    console.log(query_string)
    $.ajax({
        url : "http://127.0.0.1:8000/api/course-list",
        type : "POST",
        dataType:"json",
        data : {
             "queries" : query_string
        },
        success : function (result){
            for (var i = 0; i < result.result.courses.length; i++){
                if(result.result.courses[i]._source.skill_gain != null){
                    lst_skill.push(result.result.courses[i]._source.skill_gain.split(','));
                }
                document.getElementById('searchresult').innerHTML += '<a href="single-job-page.html" class="job-listing">' +
                '<div class="job-listing-details">' +
                    '<div class="job-listing-company-logo">' +
                    '<img src="'+result.result.courses[i]._source.course_image+'" style="width:50px;height:50px;" alt="">' +
                    '</div>' +
                    '<div class="job-listing-description">' +
                    '<h3 class="job-listing-title">'+result.result.courses[i]._source.course_title+'</h3>' +
                        '<div class="job-listing-footer">' +
                        '<ul>' +
                            '<li><i class="icon-material-outline-location-city"></i> '+result.result.courses[i]._source.offer_by+' <div class="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>' +
                            '<li><i class="icon-material-outline-language"></i> '+result.result.courses[i]._source.language+'</li>' +
                            '<li><i class="icon-material-outline-star-border"></i> '+result.result.courses[i]._source.rating+'</li>' + 
                            '<li><i class="icon-material-outline-person-pin"></i> '+result.result.courses[i]._source.enrolled+'</li>' +
                        '</ul>' +
                        '<div>'+
                    '</div>' +
                '</div>'
            }
            skill_tag()
            
        }
    });
   
})


function skill_tag(){
    var struc = []  
    for(var skill_all of lst_skill){
        for(var skill_course = 0; skill_course < skill_all.length; skill_course ++){
            var index = 0
            if(struc.length == 0){
                struc.push( {
                    'skill': skill_all[skill_course],
                    'count': 1
                })
            }
            else{  
                while(true){
                    if(struc.length == index ){
                        struc.push( {
                            'skill': skill_all[skill_course],
                            'count': 1
                        })
                        break
                    }
                    else if(skill_all[skill_course] == struc[index].skill) {
                        
                        struc[index].count += 1;
                        break
                       
                    }   
                    index += 1;
                }
            }
        }
    }

    lst_temp = []
    for(var struc_index = 0; struc_index < struc.length; struc_index++){
        
        lst_temp.push(struc[struc_index].count)
        
    }
    lst_sorted = lst_temp.sort(function(a, b){return b - a})
    temp = 1
    for ( var i =0; i<10;i++){
        for( var j of struc){
            if(j.count==lst_sorted[i]){
                const index = struc.indexOf(j);
                if (index > -1) {
                struc.splice(index, 1);
                }
                document.getElementById('skillgain').innerHTML += '<div class="tag">' +
                '<input type="checkbox" id="tag"'+temp+'/>'+
                '<label for="tag1">'+j.skill+'</label>'+
                '</div>'
                temp++;
                console.log(j);
                
            }
          
            if(temp > 10) break;
        }
    }
    console.log(struc)
}
