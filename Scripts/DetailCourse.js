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
            document.getElementById('meta').innerHTML = '<ul>' +
                                '<li>' +
                                    '<i class="icon-material-outline-speaker-notes"></i>'+
                                    '<span>Subtitle</span>' +
                                    '<h5>'+result[0].subtitle+'</h5>'+
                                '</li>'+
                                '<li>'+
                                    '<i class="icon-material-outline-person-pin"></i>'+
                                ' <span>Already Enrolled</span>'+
                                ' <h5>'+result[0].enrolled+'</h5>'+
                            ' </li>'+
                                '<li>'+
                                    '<i class="icon-material-outline-local-atm"></i>'+
                                    '<span>Salary</span>'+
                                    '<h5>$35k - $38k</h5>'+
                                '</li>'+
                            ' <li>'+
                                    '<i class="icon-material-outline-access-time"></i>'+
                                    '<span>Date Posted</span>'+
                                    '<h5>2 days ago</h5>'+
                                '</li>'+
                        ' </ul>'
            //Handling related course
            $.ajax({
                url:'http://127.0.0.1:8000/api/relatedcourse?keyword='+result[0].keyword,
                type : "GET",
                contentType:"application/json",
                dataType:"json",
                success : function (data){
                    for(var i = 0; i<data.length; i ++){
                        document.getElementById('relatedcourse').innerHTML += '<a href="#" class="job-listing">'+

                    
                                '<div class="job-listing-details">'+
                                
                                    '<div class="job-listing-company-logo">'+
                                        '<img src="'+data[i].course_image+'" alt="">'+
                                    '</div>'+

                                
                                    '<div class="job-listing-description">'+
                                    ' <h4 class="job-listing-company">'+data[i].offer_by+'</h4>'+
                                        '<h3 class="job-listing-title">'+data[i].course_title+'</h3>'+
                                ' </div>'+
                                '</div>'+

                            
                            ' <div class="job-listing-footer">'+
                                    '<ul>'+
                                    ' <li><i class="icon-material-outline-location-on"></i> San Francisco</li>'+
                                        '<li><i class="icon-material-outline-business-center"></i> Full Time</li>'+
                                        '<li><i class="icon-material-outline-account-balance-wallet"></i> $35000-$38000</li>'+
                                        '<li><i class="icon-material-outline-access-time"></i> 2 days ago</li>'+
                                    '</ul>'+
                                '</div>'+
                                '</a>'
                            if(i == 3){
                                break
                            }
                    }
                    
                }
            })
        }
    });
   
})
