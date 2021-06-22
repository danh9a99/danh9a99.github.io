var lst_cate = []
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
            sessionStorage.setItem("userid", result[0].userid);
            sessionStorage.setItem('data',JSON.stringify(user_data))
            document.getElementById('username').innerHTML =  result[0].username + '<span>Freelancer</span>'
            location.reload();
        }	
    })
}
function logout(){
    $.ajax({
        url: "http://127.0.0.1:8000/api/getuseraction", //http://27.78.33.234:8000/api/course-list
        type: "POST",
        dataType: "json",
        data: {
            userid: sessionStorage.getItem('userid'),
            list_action_time: JSON.stringify(sessionStorage.getItem('user_action_time')),
            list_action_click: JSON.stringify(sessionStorage.getItem('user_action_click'))
        },
        success: function (result) {
            // do not anything
        }
    })
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('userid')
    sessionStorage.removeItem('data')
    sessionStorage.removeItem('user_action_time')
    sessionStorage.removeItem('user_action_click')
    location.reload()
}

$(document).ready(function (){
     //logged in
  if(sessionStorage.getItem('user')==undefined){
    $('.user-menu').hide();
    $('.recommendation').hide();
  }
  else{
    $('.log-in-button').hide();
    document.getElementById('username').innerHTML = sessionStorage.getItem('user')
    //course for user:
    courseForYou(sessionStorage.getItem('user'));
  }

  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/api/course?review_option=on",
    contentType:"application/json",
    dataType:"json",
    success: function (data) {
      for(var i = 0; i < data.length; i++){
        if(data[i].skill_gain == null){
            data[i].skill_gain = 'None';
        }
        lst_cate.push(data[i].skill_gain.split(","));
      }
      cate_tag();
    }
  });
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


function cate_tag() {
    struc = calculate_list(lst_cate);
    lst_temp = [];
    for (var struc_index = 0; struc_index < struc.length; struc_index++) {
      lst_temp.push(struc[struc_index].count);
    }
    lst_sorted = lst_temp.sort(function (a, b) {
      return b - a;
    });
    temp = 1;
    for (var i = 0; i < 10; i++) {
      for (var j of struc) {
        if (j.count == lst_sorted[i] && j.skill != 'None') {
          const index = struc.indexOf(j);
          if (index > -1) {
            struc.splice(index, 1);
          }
          document.getElementById('pop-cate').innerHTML += '<div class="col-xl-3 col-md-6">'+
                    '<a href="jobs-list-layout-1.html" class="backgroud photo-box small">'+
                        '<div class="photo-box-content">'+
                            ' <h3>'+j.skill+'</h3>'+
                            ' <span>'+j.count+'</span>' +
                        '</div>' +
                    '</a>' + 
                        '</div>'
          temp++;
        }
  
        if (temp > 8) break;
      }
    }
  }

  
function calculate_list(list) {
    var struc = [];
    for (var i of list) {
      for (var j = 0; j < i.length; j++) {
        var index = 0;
        if (struc.length == 0) {
          struc.push({
            skill: i[j],
            count: 1,
          });
        } else {
          while (true) {
            if (struc.length == index) {
              struc.push({
                skill: i[j],
                count: 1,
              });
              break;
            } else if (i[j] == struc[index].skill) {
              struc[index].count += 1;
              break;
            }
            index += 1;
          }
        }
      }
    }
    return struc;
  }
  