var lst_skill = [];
var lst_offer = [];

var lst_sub = [];
$(document).ready(function(){
    q = window.location.href.split('?q=')[1]
    let query_string;
    if(q.split('%20').length != 0){
        query_string = q.replace('%20',' ');
    }
    $.ajax({
        url : "http://127.0.0.1:8000/api/course-list",
        type : "POST",
        dataType:"json",
        data : {
             "queries" : query_string
        },
        success : function (result){
            if(result.suggest_word !== result.word_search + ' '){
                document.getElementById('searchsuggest').innerHTML = '<h4>Are you looking for <strong style="color:blue"><i>'+result.suggest_word+'</i></strong></h4>'
                document.getElementById('searchword').innerHTML = '<h4>Search alternatives for <i style="color: blue">'+result.word_search+'</i></h4>'
            }
            
            for (var i = 0; i < result.result.courses.length; i++){
                if(result.result.courses[i]._source.skill_gain != null){
                    lst_skill.push(result.result.courses[i]._source.skill_gain.split(','));
                }
                lst_offer.push(result.result.courses[i]._source.offer_by);
                
                
                lst_sub.push(result.result.courses[i]._source.subtitle.split(','));

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
            offer_tag()
            enroll_tag()
            sub_tag()
            
        }
    });
   
})


function skill_tag(){
    struc = calculate_list(lst_skill)
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
        
                
            }
          
            if(temp > 10) break;
        }
    }
}
function offer_tag(){
    document.getElementById('listoffer').innerHTML  = ''
    arr = unique(lst_offer)
    select = document.getElementById('listoffer')
    $('ul.dropdown-menu').attr('id', 'dropdown');
    $('ul.dropdown-menu').attr('style','max-height: 245px; overflow-y: auto;');
    for (var i = 0; i < arr.length; i++){
        if(arr[i] == null){
            continue
        }
        var opt = document.createElement('option');
        opt.innerHTML = arr[i];
        select.appendChild(opt);
        document.getElementById('dropdown').innerHTML += '<li data-original-index="'+i+'">'+
                    '<a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false">'+
                    '<span class="text">'+arr[i]+'</span>' +
                    '<span class="glyphicon glyphicon-ok check-mark"></span>' +
                    ' </a></li>'

    }
    // // With jquery
    
    // <li data-original-index="1">
    //     <a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false">
    //         <span class="text">helo</span>
    //         <span class="glyphicon glyphicon-ok check-mark"></span>
    //     </a>
    // </li>
    
}
function sub_tag(){
    struc = calculate_list(lst_sub)
    lst_temp = []
    for(var struc_index = 0; struc_index < struc.length; struc_index++){
        
        lst_temp.push(struc[struc_index].count)
        
    }
    lst_sorted = lst_temp.sort(function(a, b){return b - a})
    temp = 1
    for ( var i =0; i<lst_sorted.length;i++){
        for( var j of struc){
            if(j.count==lst_sorted[i]){
                const index = struc.indexOf(j);
                if (index > -1) {
                struc.splice(index, 1);
                }
                document.getElementById('dropsub').innerHTML += '<li><div class="checkbox">' +
				'<input type="checkbox" id="chekcbox'+temp+'">' +
				'<label for="chekcbox'+temp+'"><span class="checkbox-icon"></span>'+j.skill+'<span class="nav-tag">'+j.count+'</span></label>' +
                '</div></li>'
                temp++;
            }
        }
    }
}


function unique(arr) {
    var formArr = arr.sort()
    var newArr = [formArr[0]]
    for (let i = 1; i < formArr.length; i++) {
      if (formArr[i] !== formArr[i - 1]) {
        newArr.push(formArr[i])
      }
    }
    return newArr
  }

function calculate_list(list){
    var struc = []  
    for(var i of list){
        for(var j = 0; j < i.length; j ++){
            var index = 0
            if(struc.length == 0){
                struc.push( {
                    'skill': i[j],
                    'count': 1
                })
            }
            else{  
                while(true){
                    if(struc.length == index ){
                        struc.push( {
                            'skill': i[j],
                            'count': 1
                        })
                        break
                    }
                    else if(i[j] == struc[index].skill) {
                        
                        struc[index].count += 1;
                        break
                       
                    }   
                    index += 1;
                }
            }
        }
    }
    return struc;
}