function generateCourse(offset){
  //window.location.href="course-list.html"
  document.getElementById('post').innerHTML = ""
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/course?limit=10&offset="+offset,
        contentType:"application/json",
        dataType:"json",
        success: function (data) {
          gen_course(data)
        }
        
      });
}

$(document).ready(function(){
  document.getElementById('post').innerHTML = ""
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/course?limit=10&offset=0",
        contentType:"application/json",
        dataType:"json",
        success: function (data) {
          gen_course(data)
          // autocomplete(document.getElementById("intro-keywords-subtitle"), lst_sub_user);
          // autocomplete(document.getElementById("intro-keywords-skill"), lst_cate);
        }
      });
});
function previousPageFunc(obj){
  offsetPrev = document.getElementById('previousClick').getAttribute('value');
  offsetNext = document.getElementById('nextClick').getAttribute('value');
  if(offsetPrev != 0){
    $('.loading').show()
    generateCourse(offsetPrev-10)
    document.getElementById('previousClick').setAttribute('value', parseInt(offsetPrev) - 10)
    document.getElementById('nextClick').setAttribute('value', parseInt(offsetNext) - 10)
  }
}
function nextPageFunc(obj){
  offsetPrev = document.getElementById('previousClick').getAttribute('value');
  offsetNext = document.getElementById('nextClick').getAttribute('value');
  if(offsetNext < 1750){
    $('.loading').show()
    generateCourse(offsetNext);
    document.getElementById('previousClick').setAttribute('value', parseInt(offsetPrev) + 10)
    document.getElementById('nextClick').setAttribute('value', parseInt(offsetNext) + 10)
  }
  
}


function gen_course(data){
  for(var index = 0; index < data.results.length; index++){
          
    document.getElementById('post').innerHTML += '<a id="'+data.results[index].course_tag+'" onclick="detailCourse(this)" style="cursor:pointer" class="job-listing">' +
          '<div class="job-listing-details">' +
          '<div class="job-listing-company-logo">' +
            '<img src="'+data.results[index].course_image+'"  style="width:55;height:55px;" alt="">' +
          '</div>'+
          '<div class="job-listing-description">' +
          '<h4 class="job-listing-company">'+data.results[index].offer_by+' <span class="verified-badge" title="Verified Employer" data-tippy-placement="top"></span></h4>' +
          '<h3 class="job-listing-title">'+data.results[index].course_title+'</h3>' +
          '<p class="job-listing-text" style="white-space: nowrap; width: 788px; overflow: hidden;text-overflow: ellipsis">'+data.results[index].about+'</p>'+
        '</div>'+
        '<span class="bookmark-icon"></span>'+
        '</div>'+
        '<div class="job-listing-footer">' +
        '<ul>'+
          '<li><i class="icon-material-outline-language"></i> '+data.results[index].language+'</li>'+
          '<li><i class="icon-material-outline-person-pin"></i> '+data.results[index].enrolled+'</li>'+
        '	<li><i class="icon-material-outline-star-border"></i> '+data.results[index].rating+'</li>'+
          '<li><i class="icon-material-outline-access-time"></i> 2 days ago</li>' +
      '	</ul>'
      '</div>'+
      '</a>'
      }
      $('.loading').hide();

}
