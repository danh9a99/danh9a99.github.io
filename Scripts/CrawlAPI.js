function generateCourse(offset){
  document.getElementById('post').innerHTML = ""
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/course?limit=10&offset="+offset,
        contentType:"application/json",
        dataType:"json",
        success: function (data) {
          for(var index = 0; index < data.results.length; index++){
              document.getElementById('post').innerHTML += '<div class="column" id="learn"><div  class="column-content"><img  src="' +
              data.results[index].course_image + '" alt="Image document" style="width:170px;height:170px;"/><h3 id="' + data.results[index].course_tag +
              '" idkhoahoc="' + data.results[index].course_tag + '" onclick="chiTietKhoaHoc(this)">' + data.results[index].course_title + '<a class="nameCourse">' +
              data.results[index].course_title + ' </a> </h3><div class="text-content"><i  class="fa fa-globe"></i> ' + data.results[index].language +
              '</div  >  <div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i>' +
            ' <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div> ' +
            ' <div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + data.results[index].enrolled + '</div> ' +
            '<div class="text-content tag-content" id="skillGain_' + data.results[index].course_tag + '"><i class="fa fa-tags" aria-hidden="true"></i></div>' +
            '<div class="underLine"><hr></div> ' +
            '<div class="contentCard__dynamicContent"><button id="' +data.results[index].course_tag+'"  onclick="chiTietKhoaHoc(this)" class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Chi tiết</button></div>   </div></div>';
          }
          $(".setHidden").hide();
          
        }
        
      });
      
}

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


