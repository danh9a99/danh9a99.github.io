function generateCourse(offset){
  //window.location.href="course-list.html"
  document.getElementById('post').innerHTML = ""
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/course?limit=10&offset="+offset,
        contentType:"application/json",
        dataType:"json",
        success: function (data) {
          for(var index = 0; index < data.results.length; index++){
         
              document.getElementById('post').innerHTML += '<a href="single-job-page.html" class="job-listing">' +
              '<div class="job-listing-details">' +
              '<div class="job-listing-company-logo">' +
							  '<img src="'+data.results[index].course_image+'"  style="width:55;height:55px;" alt="">' +
						  '</div>'+
              '<div class="job-listing-description">' +
							'<h4 class="job-listing-company">Hexagon <span class="verified-badge" title="Verified Employer" data-tippy-placement="top"></span></h4>' +
							'<h3 class="job-listing-title">'+data.results[index].course_title+'</h3>' +
							'<p class="job-listing-text">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value.</p>'+
						'</div>'+
            '<span class="bookmark-icon"></span>'+
					  '</div>'+
            '<div class="job-listing-footer">' +
						'<ul>'+
							'<li><i class="icon-material-outline-location-on"></i> '+data.results[index].language+'</li>'+
							'<li><i class="icon-material-outline-business-center"></i> '+data.results[index].enrolled+'</li>'+
						'	<li><i class="icon-material-outline-account-balance-wallet"></i> $35000-$38000</li>'+
							'<li><i class="icon-material-outline-access-time"></i> 2 days ago</li>' +
					'	</ul>'
					'</div>'+
				  '</a>'
          }
          $(".setHidden").hide();
          
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
          for(var index = 0; index < data.results.length; index++){
          
              document.getElementById('post').innerHTML += '<a href="single-job-page.html" class="job-listing">' +
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
							'<li><i class="icon-material-outline-location-on"></i> '+data.results[index].language+'</li>'+
							'<li><i class="icon-material-outline-business-center"></i> '+data.results[index].enrolled+'</li>'+
						'	<li><i class="icon-material-outline-account-balance-wallet"></i> $35000-$38000</li>'+
							'<li><i class="icon-material-outline-access-time"></i> 2 days ago</li>' +
					'	</ul>'
					'</div>'+
				  '</a>'
          }
          $(".setHidden").hide();
          
        }
        
      });
});
// function changePageFunc(obj){
//   var _lenChild = document.getElementById('changePage').childElementCount;
  
//   if(document.getElementById('inc_'+ Math.floor(_lenChild/2)).innerHTML == Math.floor(_lenChild/2)){
//     console.log("page number:" + obj.value)
//   }
// }
function previousPageFunc(obj){
  offsetPrev = document.getElementById('previousClick').getAttribute('value');
  offsetNext = document.getElementById('nextClick').getAttribute('value');
  if(offsetPrev != 0){
    
    generateCourse(offsetPrev)
    document.getElementById('previousClick').setAttribute('value', parseInt(offsetPrev) - 10)
    document.getElementById('nextClick').setAttribute('value', parseInt(offsetNext) - 10)
  }
}
function nextPageFunc(obj){
  offsetPrev = document.getElementById('previousClick').getAttribute('value');
  offsetNext = document.getElementById('nextClick').getAttribute('value');


  if(offsetNext < 1750){
    generateCourse(offsetNext);
    document.getElementById('previousClick').setAttribute('value', parseInt(offsetPrev) + 10)
    document.getElementById('nextClick').setAttribute('value', parseInt(offsetNext) + 10)
  }
  
}


