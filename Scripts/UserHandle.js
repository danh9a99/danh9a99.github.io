
$('#user-dropdown').click(function(){
    console.log('cc')
})

function logIntoDev(username){
    $.ajax({
        url: "http://127.0.0.1:8000/api/user?username=" + username, //http://27.78.33.234:8000/api/course-list
        type: "GET",
        dataType: "json",
        success: function (result) {
          
            user_data = {
                'time_onscreen_page': result[0].time_onscreen_page,
                'most_url_click': result[0].most_url_click,
                'avt': result[0].avartar,
                'type1':result[0].type1,
                'type2': result[0].type2,
                'type3': result[0].type3
            }
            sessionStorage.setItem("user", username);
            sessionStorage.setItem('data',JSON.stringify(user_data))
            document.getElementById('username').innerHTML =  result[0].username + '<span>Freelancer</span>'
            location.reload();
        }	
    })
}

function logout(){
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('data')
    sessionStorage.removeItem('user_action_time')
    sessionStorage.removeItem('user_action_click')
    location.reload()
}

$(document).ready(function (){
     //logged in
  if(sessionStorage.getItem('user')==undefined){
    $('.user-menu').hide();
  }
  else{
    $('.log-in-button').hide();
    document.getElementById('username').innerHTML = sessionStorage.getItem('user')
    //course for user:
    courseForYou(sessionStorage.getItem('user'));
  }
})

function courseForYou(username){
    
    k1 = JSON.parse(sessionStorage.getItem('data')).time_onscreen_page;
    k2 = JSON.parse(sessionStorage.getItem('data')).most_url_click;
    $.ajax({
        url: "http://127.0.0.1:8000/api/courseforuser?k1=" + k1 + "&k2=" + k2, //http://27.78.33.234:8000/api/course-list
        type: "GET",
        dataType: "json",
        success: function (result) {
            for(var i = 0; i< result.length; i++){
                document.getElementById('list-course-for-user').innerHTML += '<a id="'+result[i].course_tag+'" onclick="detailCourse(this)" style="cursor:pointer" class="job-listing with-apply-button">' +
                    ' <div class="job-listing-details">' +
                        ' <div class="job-listing-company-logo">' +
                            '<img src="'+result[i].course_image+'" alt="">' +
                        '</div>' +
                        '<div class="job-listing-description">'+
                            '<h3 class="job-listing-title">'+result[i].course_title +'</h3>'+
                            '<div class="job-listing-footer">'+
                                '<ul>'+
                                    '<li><i class="icon-material-outline-business"></i>'+result[i].offer_by+'<div class="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>'+
                                    '<li><i class="icon-material-outline-person-pin"></i> '+result[i].enrolled+'</li>'+
                                    '<li>'+gen_star_custom(result[i].rating)+'</li>'+
                                    '<li><i class="icon-material-outline-access-time"></i> 2 days ago</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<span class="list-apply-button ripple-effect">Go to class</span>'+
                    '</div>'+
                ' </a>'	
                if(i==4){
                    break
                }
            }
           
        }	
    })
}




function gen_star_custom(star){
    if(star < 5 && star > 4){
        return '<div class="star-rating" style="margin-bottom:-7px" data-rating="'+star+'"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star half"></span></div>'
    }
    if(star < 4 && star > 3){
        return '<div class="star-rating" style="margin-bottom:-7px" data-rating="'+star+'"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star half"></span><span class="star empty"></span></div>'
    }
    if(star < 3 && star > 2){
        return '<div class="star-rating" style="margin-bottom:-7px" data-rating="'+star+'"><span class="star"></span><span class="star"></span><span class="star half"></span><span class="star empty"></span><span class="star empty"></span></div>'
    }
    if(star < 2 && star > 1){
        return '<div class="star-rating" style="margin-bottom:-7px" data-rating="'+star+'"><span class="star"></span><span class="star half"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span></div>'
    }

    switch(star) {
        case 5:
            return '<div class="star-rating" style="margin-bottom:-7px" data-rating="5.0"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span></div>'
            break;
        case 4:
            return '<div class="star-rating" style="margin-bottom:-7px" data-rating="4.0"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star empty"></span></div>'
            break;
        case 3:
            return '<div class="star-rating" style="margin-bottom:-7px" data-rating="4.0"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star empty"></span><span class="star empty"></span></div>'
            break
        case 2:
            return '<div class="star-rating" style="margin-bottom:-7px" data-rating="2.0"><span class="star"></span><span class="star"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span></div>'
            break
        case 1:
            return '<div class="star-rating" style="margin-bottom:-7px" data-rating="1.0"><span class="star"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span></div>'
            break 
        default:
            return star
            break
      }
}