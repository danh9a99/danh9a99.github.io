$(document).ready(function(){
    q = window.location.href.split('?tag=')[1]
    $.ajax({
        url : "http://127.0.0.1:8000/api/course?course_tag="+q,
        type : "GET",
        contentType:"application/json",
        dataType:"json",
        success : function (result){
            console.log(result)
            document.getElementById('image').innerHTML = '<a href="single-company-profile.html"><img src="'+result[0].course_image+'" alt=""></a>'
            document.getElementById('headertitle').innerHTML = '<h3>'+result[0].course_title+'</h3>'+
                        '<h5>'+result[0].offer_by+'</h5>'+
                        '<ul>'+
                           ' <li><a href="single-company-profile.html"><i class="icon-material-outline-business"></i> King</a></li>' +
                            '<li><div class="star-rating" data-rating="4.9"></div></li>' +
                            '<li><img class="flag" src="images/flags/gb.svg" alt="">'+result[0].language+'</li>' +
                            '<li><div class="verified-badge-with-title">Verified</div></li>' +
                        '</ul>'
            document.getElementById('about').innerHTML = '<h3 class="margin-bottom-25">About this course</h3>'+
            '<p>'+result[0].about.split('SHOW')[0]+'</p>'

        }
    });
   
})
