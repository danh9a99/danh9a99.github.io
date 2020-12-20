

// Get the elements with class="column"
var elements = document.getElementsByClassName("column");
var elements_loading = document.getElementsByClassName("column-loading");
// Grid View
function gridView() {
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width = "50%";
    }
    for (var j = 0; i < elements_loading.length; j++) {
        elements_loading[i].style.width = "50%";
    }
}
$("#back").hide();
//Liên quan đến file export_data_coursera
var dataJson = {};
var khoaHoc = [];
var khoaHoc_name = [];
var tenKhoaHoc = 0;
//CÁC KHÓA HỌC CỦA SPECIALIZATIONS
courseraSpec = [];
//CÁC KHÓA HỌC CỦA PROFESSSIONAL CERTIFI
courseraProf = [];
//Liên quan đến file key_words
var dataJon1 = {};
var idKeyWords = [];
var arrResult = [];
var documentNo = [];
var scoreRate = [];
var temp = 0;
var inc = 0;
$.getJSON("https://raw.githubusercontent.com/danh9a99/API/main/export_data_coursera_classcentral_Final.json", function (json) {
    dataJson = json;
    //Object.keys(jsonfile.coursera.learn).length
    console.log(Object.keys(json.coursera.learn).length / 10)
    learn_max_page = Object.keys(json.coursera.learn).length / 10;
    spec_max_page = Object.keys(json.coursera.specializations).length / 10;
    prof_max_page = Object.keys(json.coursera.professional_certificates).length / 10;
    minus = 2
    minus_1 = 1
    index_page = 1;
    for (var page = 1; page <= learn_max_page+1; page++) { //for này xử lý phân trang, 62 là số trang
        if (page <= 6) {
            document.getElementById('changePage').innerHTML += '<a class="page-value" id="inc_' + page + '"onclick="changePageFunc(this)">' + page + '</a>';
        }
        else if (page > 6) {

            document.getElementById('inc_' + (page - minus).toString()).innerHTML = "...";
            document.getElementById('inc_' + (page - minus_1).toString()).innerHTML = page;

            minus++;
            minus_1++;
        }
    }

    document.getElementById('changePage').innerHTML += '<a id="nextClick" onclick="nextPageFunc()">&raquo;</a>';
    // $("#loadMore").on('click', function (e) {
    //     e.preventDefault();
    //     temp += 10;
    //     showPost(json, temp);


    //     $(".column:hidden").slice(0, 10).slideDown();
    //     $(".loader").hide();
    //     $("#back").hide();
    //     $("#detailCourse").hide();
    //     if ($(".column:hidden").length == 0) {
    //         $("#load").fadeOut('slow');
    //     }
    //     //$('html,body').animate({
    //     //    scrollTop: $(this).offset().top
    //     //}, 1500);

    // });

    for (khName of Object.keys(json.coursera.learn)) {
        khoaHoc.push(khName); //Cái này là biến chứa tên của các khoá học
        khoaHoc_name.push(json.coursera.learn[khName].name);
    }
    for (khNameSpec of Object.keys(json.coursera.specializations)) {
        khoaHoc.push(khNameSpec);
        khoaHoc_name.push(json.coursera.specializations[khNameSpec].name);
        courseraSpec.push(khNameSpec);

    }
    for (khNameProf of Object.keys(json.coursera.professional_certificates)) {
        khoaHoc.push(khNameProf); //Cái này là biến chứa tên của các khoá học
        khoaHoc_name.push(json.coursera.professional_certificates[khNameProf].name);
        courseraProf.push(khNameProf);
    }
    console.log('idc bắt đầu learn = ' + inc);
    //BẮT ĐẦU KHOÁ HỌC LEARN//
    for (var1 of Object.keys(json.coursera.learn)) {


        document.getElementById('post').innerHTML += '<div class="column" id="learn"><div  class="column-content"><img  src="' +
            json.coursera.learn[var1].image + '" alt="Image document" /><h3 id="' + var1 + '_' + json.coursera.learn[var1].id +
            '" idkhoahoc="' + json.coursera.learn[var1].id + '" onclick="chiTietKhoaHoc(this)">' + json.coursera.learn[var1].name + '<a class="nameCourse">' +
            json.coursera.learn[var1].name + ' </a> </h3><div class="text-content"><i  class="fa fa-globe"></i> ' + json.coursera.learn[var1].language +
            '</div  >  <div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i>' +
            ' <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div> ' +
            ' <div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + json.coursera.learn[var1].instructors[0].learners + '</div> ' +
            '<div class="text-content tag-content" id="skillGain_' + json.coursera.learn[var1].id + '"><i class="fa fa-tags" aria-hidden="true"></i></div>' +
            '<div class="underLine"><hr></div> ' +
            '<div class="contentCard__dynamicContent"><button id="' + var1 + '_' + json.coursera.learn[var1].id+'"  onclick="chiTietKhoaHoc(this)" class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Chi tiết</button></div>   </div></div>';
        //lấy skill_gain gắn vào tags
        for (var skill_gain = 0; skill_gain < json.coursera.learn[var1].skill_gain.length; skill_gain++) {
            document.getElementById('skillGain_' + json.coursera.learn[var1].id).innerHTML += '<span class="listtag">' + json.coursera.learn[var1].skill_gain[skill_gain] + '</span>';
            //console.log();
        }

        $(".loader").hide(); //tắt loader

        inc++;
        if (inc == 10) {
            break;
        }
    }
    //KẾT THÚC KHOÁ HỌC LEARN//
    console.log('idc kết thúc learn = ' + inc);
    inc = 0;
    //BẮT ĐẦU KHOÁ HỌC SPEC//
    console.log('idc bắt đầu specializations = ' + inc);
    for (var2 of Object.keys(json.coursera.specializations)) {

        document.getElementById('post').innerHTML += '<div class="column" id="specializations"><div  class="column-content"><img  src="' + json.coursera.specializations[var2].image + '" alt="Image document" />' +
            '<h3 id="' + var2 + '_' + json.coursera.specializations[var2].id + '" onclick="chiTietKhoaHoc(this)">' + json.coursera.specializations[var2].name + '<a class="nameCourse">' + json.coursera.specializations[var2].name + ' </a> </h3>' +
            '<div class="text-content"><i  class="fa fa-globe"></i> ' + json.coursera.specializations[var2].language + '</div  > ' +
            '<div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div> ' +
            '<div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + json.coursera.specializations[var2].instructors[0].learners + '</div> ' +
            '<div class="text-content tag-content" id="skillGain_' + inc + '"><i class="fa fa-tags" aria-hidden="true"></i></div>' +
            '<div class="underLine"><hr></div>' +
            '<div class="contentCard__dynamicContent"><button  onclick="chiTietKhoaHoc(' + var2 + ')" class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Chi tiết</button></div>   </div></div>';

        //Lấy skill_gain gắn vào tags
        for (var skill_gain = 0; skill_gain < json.coursera.specializations[var2].skill_gain.length; skill_gain++) {
            document.getElementById('skillGain_' + inc).innerHTML += '<span class="listTag">' + json.coursera.specializations[var2].skill_gain[skill_gain] + '</span>';
            //console.log();
        }

        //$(".loader").hide(); //tắt loader
        $(".setHidden").hide();
        inc++;
        if (inc == 10) {
            break;
        }
    }
    console.log('idc kết thúc specializations = ' + inc);
    //KẾT THÚC KHOÁ HỌC SPEC//
    inc = 0;
    //BẮT ĐẦU KHOÁ HỌC PROF//
    console.log('idc bắt đầu professional_certificates = ' + inc);
    for (var3 of Object.keys(json.coursera.professional_certificates)) {


        document.getElementById('post').innerHTML += '<div class="column" id="professional_certificates"><div  class="column-content"><img  src="' + json.coursera.professional_certificates[var3].image + '" alt="Image document" />' +
            '<h3 id="' + var3 + '_' + json.coursera.professional_certificates[var3].id + '" onclick="chiTietKhoaHoc(this)">' + json.coursera.professional_certificates[var3].name + '<a class="nameCourse">' + json.coursera.professional_certificates[var3].name + ' </a> </h3>' +
            '<div class="text-content"><i  class="fa fa-globe"></i> ' + json.coursera.professional_certificates[var3].language + '</div > ' +
            '<div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>' +
            '<div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + json.coursera.professional_certificates[var3].instructors[0].learners + '</div>' +
            '<div class="text-content tag-content" id="skillGain_' + inc + '"><i class="fa fa-tags" aria-hidden="true"></i></div>' +
            '<div class="underLine"><hr></div>' +
            '<div class="contentCard__dynamicContent"><button  onclick="chiTietKhoaHoc(' + var3 + ')" class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Chi tiết</button></div>   </div></div>';
        //Lấy skill_gain gắn vào tags
        for (var skill_gain = 0; skill_gain < json.coursera.professional_certificates[var3].skill_gain.length; skill_gain++) {
            document.getElementById('skillGain_' + inc).innerHTML += '<span class="listTag">' + json.coursera.professional_certificates[var3].skill_gain[skill_gain] + '</span>';
            //console.log();
        }

        $(".loader").hide(); //tắt loader

        inc++;
        if (inc == 10) {
            break;
        }
    }
    //KẾT THÚC KHOÁ HỌC PROF//
});
//Chọn số trang

function changePageFunc(obj) {
    temp = 1;
    //document.getElementsByClassName("page-value")[parseInt(document.getElementById(obj.id).innerHTML)-1].setAttribute("class", "active");
    pageNow = parseInt(document.getElementById(obj.id).innerHTML);
    //document.getElementById(obj.id).href = "/?page=" + pageNow;

    document.getElementById('post').innerHTML = "";
    showPost(dataJson, pageNow);
    
    if (document.getElementById(obj.id).innerHTML == 62) {
        for (var numPage = 5; numPage >= 3; numPage--) {
            document.getElementById('inc_' + numPage).innerHTML = 62 - temp;
            temp++;
        }
        document.getElementById('inc_' + 2).innerHTML = '...';
        document.getElementById('inc_' + 1).innerHTML = 1;
    }
    else if (document.getElementById(obj.id).innerHTML == 1) {
        for (var numPage = 1; numPage <= 4; numPage++) {
            document.getElementById('inc_' + numPage).innerHTML = numPage;
        }
        document.getElementById('inc_' + 5).innerHTML = '...';
        document.getElementById('inc_' + 6).innerHTML = 62;
    }
}
//Xử lý sự kiện click next
function nextPageFunc() {
    if (pageNow == 62) {
        document.getElementById('nextClick').style.visibility = 'hidden';
        document.getElementById('previousClick').style.visibility = "visible";
    }
    else {
        document.getElementById('post').innerHTML = "";
        //document.getElementsByClassName("page-value")[0].setAttribute("class", "active");
        showPost(dataJson, ++pageNow);
        document.getElementById('previousClick').style.visibility = "visible";
    }

}
//Xử lý sự kiện click previous
function previousPageFunc() {
    if (pageNow == 1) {
        document.getElementById('previousClick').style.visibility = 'hidden';
        document.getElementById('nextClick').style.visibility = 'visible';
    } else {
        document.getElementById('post').innerHTML = "";
        showPost(dataJson, --pageNow);
        document.getElementById('nextClick').style.visibility = 'visible';
    }
}

//SHOW POST
function showPost(jsonfile, count) {
    if (count == 62) {
        for (var i = 10 * (count - 1); i < 10 * (count - 1) + 9; i++) {

            document.getElementById('post').innerHTML += '<div class="column" id="learn"><div class="column-content"><img src="' + jsonfile.coursera.learn[khoaHoc[i]].image + '" alt="Image document">' +
                '<h3 id="' + khoaHoc[i] + '_' + jsonfile.coursera.learn[khoaHoc[i]].id + '" onclick="chiTietKhoaHoc(this)">' + jsonfile.coursera.learn[khoaHoc[i]].name + '<a class="nameCourse">' + jsonfile.coursera.learn[khoaHoc[i]].name + ' </a> </h3>' +
                '<div class="text-content"><i class="fa fa-globe"></i>' + jsonfile.coursera.learn[khoaHoc[i]].language + '</div>' +
                '<div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>' +
                '<div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + jsonfile.coursera.learn[khoaHoc[i]].instructors[0].learners + '</div>' +
                '<div class="text-content tag-content" id="skillGain_Learn' + i + '"><i class="fa fa-tags" aria-hidden="true"></i></div>' +
                '<div class="underLine"><hr></div>' +
                '<div class="contentCard__dynamicContent"><button onclick="chiTietKhoaHoc(' + i + ')"  class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Chi tiết</button></div>   </div></div>';
            //document.getElementById('post').innerHTML += '<div class="column" id="specializations"><div  class="column-content"><img  src="' + jsonfile.coursera.specializations[courseraSpec[i]].image + '" alt="Image document" /><h3 id="' + courseraSpec[i] + '_' + jsonfile.coursera.specializations[courseraSpec[i]].id + '" onclick="chiTietKhoaHoc(this)">' + jsonfile.coursera.specializations[courseraSpec[i]].name + '<a class="nameCourse">' + jsonfile.coursera.specializations[courseraSpec[i]].name + ' </a> </h3><div class="text-content"><i  class="fa fa-globe"></i> ' + jsonfile.coursera.specializations[courseraSpec[i]].language + '</div  >  <div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>  <div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + jsonfile.coursera.specializations[courseraSpec[i]].instructors[0].learners + '</div> <div class="text-content tag-content" id="skillGain_Spec' + i + '"><i class="fa fa-tags" aria-hidden="true"></i></div><div class="underLine"><hr></div> <div class="contentCard__dynamicContent"><button  onclick="chiTietKhoaHoc(' + i + ')" class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Chi tiết</button></div>   </div></div>';
            //document.getElementById('post').innerHTML += '<div class="column" id="professional_certificates"><div  class="column-content"><img  src="' + jsonfile.coursera.professional_certificates[courseraProf[i]].image + '" alt="Image document" /><h3 id="' + courseraProf[i] + '_' + jsonfile.coursera.professional_certificates[courseraProf[i]].id + '" onclick="chiTietKhoaHoc(this)">' + jsonfile.coursera.professional_certificates[courseraProf[i]].name + '<a class="nameCourse">' + jsonfile.coursera.professional_certificates[courseProf[i]].name + ' </a> </h3><div class="text-content"><i  class="fa fa-globe"></i> ' + jsonfile.coursera.professional_certificates[courseraProf[i]].language + '</div  >  <div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>  <div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + jsonfile.coursera.professional_certificates[courseraProf[i]].instructors[0].learners + '</div> <div class="text-content tag-content" id="skillGain_Prof' + i + '"><i class="fa fa-tags" aria-hidden="true"></i></div><div class="underLine"><hr></div> <div class="contentCard__dynamicContent"><button  onclick="chiTietKhoaHoc(' + i + ')" class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Chi tiết</button></div>   </div></div>';

            for (var skill_gain = 0; skill_gain < jsonfile.coursera.learn[khoaHoc[i]].skill_gain.length; skill_gain++) {
                document.getElementById('skillGain_Learn' + i).innerHTML += '<span class="listTag">' + jsonfile.coursera.learn[khoaHoc[i]].skill_gain[skill_gain] + '</span>';
                //document.getElementById('skillGain_Spec' + i).innerHTML += '<span class="listTag">' + jsonfile.coursera.specializations[courseraSpec[i]].skill_gain[skill_gain] + '</span>';
                //document.getElementById('skillGain_Prof' + i).innerHTML += '<span class="listTag">' + jsonfile.coursera.professional_certificates[courseraProf[i]].skill_gain[skill_gain] + '</span>';

            }
            tenKhoaHoc++;
            //document.getElementById(khoaHoc[i]).classList.remove("linear-background");
        }
    }
    else{
        
        for (var i = 10 * (count - 1); i < 10 * (count - 1) + 10; i++) {
            if (courseraProf[i] != undefined) { // chạy ngáo ngáo nó hết các khóa học của bên prof thì mình không chạy nữa
                document.getElementById('post').innerHTML += '<div class="column" id="professional_certificates"><div  class="column-content"><img  src="' + jsonfile.coursera.professional_certificates[courseraProf[i]].image + '" alt="Image document" />' +
                    '<h3 id="' + courseraProf[i] + '_' + jsonfile.coursera.professional_certificates[courseraProf[i]].id + '" onclick="chiTietKhoaHoc(this)">' + jsonfile.coursera.professional_certificates[courseraProf[i]].name + '<a class="nameCourse">' + jsonfile.coursera.professional_certificates[courseraProf[i]].name + ' </a> </h3>' +
                    '<div class="text-content"><i  class="fa fa-globe"></i> ' + jsonfile.coursera.professional_certificates[courseraProf[i]].language + '</div>' +
                    '<div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>' +
                    '<div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + jsonfile.coursera.professional_certificates[courseraProf[i]].instructors[0].learners + '</div>' +
                    '<div class="text-content tag-content" id="skillGain_Prof' + i + '"><i class="fa fa-tags" aria-hidden="true"></i></div>' +
                    '<div class="underLine"><hr></div>' +
                    '<div class="contentCard__dynamicContent"><button  onclick="chiTietKhoaHoc(' + i + ')" class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Chi tiết</button></div>   </div></div>';
                for (var skill_gain = 0; skill_gain < jsonfile.coursera.learn[khoaHoc[i]].skill_gain.length; skill_gain++) {
                    document.getElementById('skillGain_Prof' + i).innerHTML += '<span class="listTag">' + jsonfile.coursera.professional_certificates[courseraProf[i]].skill_gain[skill_gain] + '</span>';

                    //console.log();
                }
            }
            if (courseraSpec[i] != undefined) {
                document.getElementById('post').innerHTML += '<div class="column" id="specializations"><div  class="column-content"><img  src="' + jsonfile.coursera.specializations[courseraSpec[i]].image + '" alt="Image document" />' +
                    '<h3 id="' + courseraSpec[i] + '_' + jsonfile.coursera.specializations[courseraSpec[i]].id + '" onclick="chiTietKhoaHoc(this)">' + jsonfile.coursera.specializations[courseraSpec[i]].name + '<a class="nameCourse">' + jsonfile.coursera.specializations[courseraSpec[i]].name + ' </a> </h3>' +
                    '<div class="text-content"><i  class="fa fa-globe"></i> ' + jsonfile.coursera.specializations[courseraSpec[i]].language + '</div>' +
                    '<div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>' +
                    '<div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + jsonfile.coursera.specializations[courseraSpec[i]].instructors[0].learners + '</div>' +
                    '<div class="text-content tag-content" id="skillGain_Spec' + i + '"><i class="fa fa-tags" aria-hidden="true"></i></div>' +
                    '<div class="underLine"><hr></div>' +
                    '<div class="contentCard__dynamicContent"><button  onclick="chiTietKhoaHoc(' + i + ')" class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Chi tiết</button></div>   </div></div>';
                for (var skill_gain = 0; skill_gain < jsonfile.coursera.learn[khoaHoc[i]].skill_gain.length; skill_gain++) {
                    document.getElementById('skillGain_Spec' + i).innerHTML += '<span class="listTag">' + jsonfile.coursera.specializations[courseraSpec[i]].skill_gain[skill_gain] + '</span>';

                    //console.log();
                }
            }
            document.getElementById('post').innerHTML += '<div class="column" id="learn"><div class="column-content"><img src="' + jsonfile.coursera.learn[khoaHoc[i]].image + '" alt="Image document">' +
                '<h3 id="' + khoaHoc[i] + '_' + jsonfile.coursera.learn[khoaHoc[i]].id + '" onclick="chiTietKhoaHoc(this)">' + jsonfile.coursera.learn[khoaHoc[i]].name + '<a class="nameCourse">' + jsonfile.coursera.learn[khoaHoc[i]].name + ' </a> </h3>' +
                '<div class="text-content"><i class="fa fa-globe"></i>' + jsonfile.coursera.learn[khoaHoc[i]].language + '</div >' +
                '<div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>' +
                '<div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + jsonfile.coursera.learn[khoaHoc[i]].instructors[0].learners + '</div>' +
                '<div class="text-content tag-content" id="skillGain_Learn' + i + '"><i class="fa fa-tags" aria-hidden="true"></i></div>' +
                '<div class="underLine"><hr></div>' +
                '<div class="contentCard__dynamicContent"><button onclick="chiTietKhoaHoc(' + i + ')"  class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Chi tiết</button></div>   </div></div>';

            for (var skill_gain = 0; skill_gain < jsonfile.coursera.learn[khoaHoc[i]].skill_gain.length; skill_gain++) {
                document.getElementById('skillGain_Learn' + i).innerHTML += '<span class="listTag">' + jsonfile.coursera.learn[khoaHoc[i]].skill_gain[skill_gain] + '</span>';

                //console.log();
            }
            tenKhoaHoc++;
            //document.getElementById(khoaHoc[i]).classList.remove("linear-background");
        }
    }

    tenKhoaHoc = 0;
    //$(".column").hide(); //Ẩn tất cả đi
    //$(".column").slice(0, 10).show(); //Hiển thị lại 10 cái đầu tiên

    $(".loader").hide(); //tắt loader
}


$.getJSON("https://raw.githubusercontent.com/danh9a99/API/main/key_word.json", function (json1) {
    dataJon1 = json1;
});
function quayLai() {
    $("#loadMore").show();
    $("#back").hide();
    $("#relatedCourse").hide();
    $("#detailCourse").hide();
    $("#post").show();
    document.getElementById('relatedCourse').innerHTML = "";
    idKeyWords = [];
    arrResult = [];
    scoreRate = [];
    $(".loader").hide();

}

//Sự kiện click vào một khoá học -> chi tiết của khoá học đó
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var modal = document.getElementById("chiTietKhoaHoc");
window.onclick = function (event) {
    if (event.target == modal) {
        $("#back").hide();
        $("#relatedCourse").hide();
        $("#detailCourse").hide();
        $("#post").show();
        document.getElementById('relatedCourse').innerHTML = "";
        idKeyWords = [];
        arrResult = [];
        scoreRate = [];
        $(".loader").hide();
    }
}
function chiTietKhoaHoc(obj) {
    //$('#changePage').hide();
    var stringID = obj.id.split('_'); //tách id của tag, phần tử thứ nhất của StringID là CourseCode, phân tử thứ 2 là CourseID
    
    $("#chiTietKhoaHoc").modal("show");
    $("#relatedCourse").show();
    $("#detailCourse").show();
    $("#back").show();
    arrTemp = [];
    if (stringID[1] <= 618) {
        document.getElementById('detailCourse').innerHTML = '<div class="bg"><h3><a href="' + dataJson.coursera.learn[stringID[0]].link + '">' + dataJson.coursera.learn[stringID[0]].name + '</a></h3></div>' + '<div class="about-course"><span>' + dataJson.coursera.learn[stringID[0]].about + '</span></div>  <div class="contentCard__dynamicContent"><button  class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Cần biết thêm?</button></div>   <h2>Có thể bạn quan tâm</h2>';

    }
    if (stringID[1] > 618 && stringID[1] <= 973) {
        document.getElementById('detailCourse').innerHTML = '<div class="bg"><h3><a href="' + dataJson.coursera.specializations[stringID[0]].link + '">' + dataJson.coursera.specializations[stringID[0]].name + '</a></h3></div>' + '<div class="about-course"><span>' + dataJson.coursera.specializations[stringID[0]].about_specialization + '</span></div>  <div class="contentCard__dynamicContent"><button  class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Cần biết thêm?</button></div>   <h2>Có thể bạn quan tâm</h2>';

    }
    if (stringID[1] > 973 && stringID[1] <= 995) {
        document.getElementById('detailCourse').innerHTML = '<div class="bg"><h3><a href="' + dataJson.coursera.professional_certificates[stringID[0]].link + '">' + dataJson.coursera.professional_certificates[stringID[0]].name + '</a></h3></div>' + '<div class="about-course"><span>' + dataJson.coursera.professional_certificates[stringID[0]].about_professional_certificate + '</span></div>  <div class="contentCard__dynamicContent"><button  class="btn-dez" data-toggle="modal"><i class="fa fa-list-alt"></i>Cần biết thêm?</button></div>   <h2>Có thể bạn quan tâm</h2>';

    }
    for (var i = 0; i < 995; i++) { // so sanh key_word của id được chọn  với với tất cả các keyword trong key_words.json
        if (dataJon1[i].Keywords == dataJon1[stringID[1]].Keywords && i != stringID[1]) {
            scoreRate.push(dataJon1[i].Topic_Perc_Contrib);
            arrResult.push([dataJon1[i].Document_No, dataJon1[i].Topic_Perc_Contrib]); //Cho ra list điểm pair với id doc tương ứng

        }

    }
    scoreRate.sort()
    scoreRate.reverse(); //sắp xếp id theo thứ tự scoreRate giảm dần
        for (varDoc of arrResult) {
            for (sroceIndex = 0; sroceIndex < scoreRate.length; sroceIndex++) {
                if (varDoc[1] == scoreRate[sroceIndex]) {
                    idKeyWords.push(varDoc[0]);
                    
                }
            }
        }
    console.log(scoreRate);
    console.log(arrResult);
  //Loai bo phan tu trung lap
function unique(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
console.log(unique(idKeyWords));
    //console.log(dataJson.coursera.learn[khoaHoc[0]].about);

    //so sánh id của key_words.json với id của export_...

    for (id of unique(idKeyWords)) {
        var idInt = parseInt(id);
        if (idInt <= 618) {
            document.getElementById('relatedCourse').innerHTML += '<div class="column" id="learn"><div  class="column-content-modal"><img  src="' + dataJson.coursera.learn[khoaHoc[idInt]].image + '" alt="Image document" />' +
                '<div class="popup" onclick="popUpAbout(' + idInt + ')"><h3 id="' + khoaHoc[idInt] + '">' + dataJson.coursera.learn[khoaHoc[idInt]].name + '</h3>' +
                '<span class="popuptext" id="myPopupAbout_' + idInt + '">' + dataJson.coursera.learn[khoaHoc[idInt]].about + '</span> </div>' +
                '<div class="text-content"><i  class="fa fa-globe"></i> ' + dataJson.coursera.learn[khoaHoc[idInt]].language + '</div>' +
                '<div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>' +
                '<div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + dataJson.coursera.learn[khoaHoc[idInt]].instructors[0].learners + '</div>' +
                '<div class="underLine"></div>    </div></div>';

        }
        if (idInt > 618 && idInt <= 973) {
            document.getElementById('relatedCourse').innerHTML += '<div class="column" id="specializations"><div  class="column-content-modal"><img  src="' + dataJson.coursera.specializations[khoaHoc[idInt]].image + '" alt="Image document" />' +
                '<div class="popup" onclick="popUpAbout(' + idInt + ')"><h3 id="' + khoaHoc[idInt] + '">' + dataJson.coursera.specializations[khoaHoc[idInt]].name + '</h3>' +
                '<span class="popuptext" id="myPopupAbout_' + idInt + '">' + dataJson.coursera.specializations[khoaHoc[idInt]].about_specialization + '</span></div>' +
                '<div class="text-content"><i  class="fa fa-globe"></i> ' + dataJson.coursera.specializations[khoaHoc[idInt]].language + '</div>' +
                '<div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span>' +
                '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>' +
                '<div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + dataJson.coursera.specializations[khoaHoc[idInt]].instructors[0].learners + '</div>' +
                '<div class="underLine"></div>    </div></div>';

        }
        if (idInt > 973 && idInt <= 995) {
            document.getElementById('relatedCourse').innerHTML += '<div class="column" id="professional_certificate"><div  class="column-content-modal"><img  src="' + dataJson.coursera.professional_certificates[khoaHoc[idInt]].image + '" alt="Image document" />' +
                '<div class="popup" onclick="popUpAbout(' + idInt + ')"><h3 id="' + khoaHoc[idInt] + '">' + dataJson.coursera.professional_certificates[khoaHoc[idInt]].name + '</h3>' +
                '<span class="popuptext" id="myPopupAbout_' + idInt + '">' + dataJson.coursera.professional_certificates[khoaHoc[idInt]].about_professional_certificate + '</span> </div>' +
                '<div class="text-content"><i  class="fa fa-globe"></i> ' + dataJson.coursera.professional_certificates[khoaHoc[idInt]].language + '</div>' +
                '<div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>' +
                '<div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + dataJson.coursera.professional_certificates[khoaHoc[idInt]].instructors[0].learners + '</div>' +
                '<div class="underLine"></div>    </div></div>';
        }
        //dataJson.coursera.learn[khoaHoc[idInt]].about

        tenKhoaHoc++;
        if (tenKhoaHoc == 6) {
            break;
        }
    }
    tenKhoaHoc = 0;
    //$('#post').hide();
    $("#loadMore").hide();
}

var charRemoved;
//Thu gọn side bar
function minimizeBox() {

    var isHidden = document.getElementById('checkHidden').getAttribute('isHidden');
    if (isHidden == "True") {
        charRemoved = document.getElementById('listCoursePage').innerHTML;
        console.log(charRemoved);
        $(".isHidden").remove();
        document.getElementById('muiTen').innerHTML = '<svg viewBox="0 0 1024 1024" focusable="false" class="" data-icon="caret-right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path></svg>'
        document.getElementById('checkHidden').setAttribute("ishidden", "False");
    }
    else if (isHidden == "False") {
        document.getElementById('unLock').innerHTML += '<div id="listCoursePage" class="categoriesAndTypes isHidden">' + charRemoved + '</div>';
        document.getElementById('checkHidden').setAttribute("ishidden", "True");
        document.getElementById('muiTen').innerHTML = '<svg viewBox="0 0 1024 1024" focusable="false" class="" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path></svg>';
    }

}

/**
 * 
 Xử lý checkox
 */
var main_check = document.getElementById("checkAll");
var all_check = document.getElementsByName('all[]');
function checkAll(type) {
    for (var i = 0; i < all_check.length; i++) {
        all_check[i].checked = type;
    }
}

$('#listCoursePage :checkbox').change(function () {
    console.log("đã check");
    var post = document.getElementById('post').innerHTML;
    if (this.checked && this.value == "coursera") {
        if (post != "") {
            document.getElementById('post').innerHTML = "";
        }
        checkAll(true);
        getPostLearn(dataJson);
    }
    else if(!this.checked && this.value=="coursera") {
        
        checkAll(false);
        document.getElementById('post').innerHTML = "";
    }
    //Check if user checked into learn_box
    if (this.checked && this.value == "learn") {
        if (post != "") {
            document.getElementById('post').innerHTML = "";
        }
        main_check.checked = true;
        getPostLearn(dataJson);
    }
    else if (!this.checked && this.value == "learn") {
        main_check.checked = false;
        document.getElementById('post').innerHTML = "";
    }

    if (this.checked && this.value == "specializations") {
        if (post != "") {
            document.getElementById('post').innerHTML = "";
        }
        main_check.checked = true;
        getPostLearn(dataJson);
    }
});

function getPostLearn(jsonfile) {

    for (var i = 0; i < 10; i++) {

        document.getElementById('post').innerHTML += '<div class="column" id="learn"><div class="column-content"><img src="' + jsonfile.coursera.learn[khoaHoc[i]].image + '" alt="Image document">' +
            '<h3 id="' + khoaHoc[i] + '_' + jsonfile.coursera.learn[khoaHoc[i]].id + '" onclick="chiTietKhoaHoc(this)">' + jsonfile.coursera.learn[khoaHoc[i]].name + '<a class="nameCourse">' + jsonfile.coursera.learn[khoaHoc[i]].name + ' </a> </h3>' +
            '<div class="text-content"><i class="fa fa-globe"></i>' + jsonfile.coursera.learn[khoaHoc[i]].language + '</div>' +
            '<div class="text-content"><i class="fa fa-shield" aria-hidden="true"></i> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>' +
            '<div class="text-content"><i class="fa fa-user" aria-hidden="true"></i>' + jsonfile.coursera.learn[khoaHoc[i]].instructors[0].learners + '</div>  <div class="text-content tag-content" id="skillGain_' + i + '"><i class="fa fa-tags" aria-hidden="true"></i></div>' +
            '<div class="underLine"><hr></div>   </div></div>';
        for (var skill_gain = 0; skill_gain < jsonfile.coursera.learn[khoaHoc[i]].skill_gain.length; skill_gain++) {
            document.getElementById('skillGain_' + i).innerHTML += '<span class="listTag">' + jsonfile.coursera.learn[khoaHoc[i]].skill_gain[skill_gain] + '</span>';
        }
        tenKhoaHoc++;
       
    }


    tenKhoaHoc = 0;

    $(".loader").hide(); //tắt loader
}

function popUpAbout(id) {
    var popup = document.getElementById("myPopupAbout_"+id);
    console.log(id);
    popup.classList.toggle("show");
}

//Tính năng Search
function autocomplete(inp, arr, arrKhoaHoc, jsonfile) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        //var n = str.search(val.toUpperCase());
        /*for each item in the array...*/
        

        for (i = 0; i < arr.length; i++) {
            if (arr[i].toUpperCase().indexOf(val.toUpperCase()) >= 0) {
                b = document.createElement("DIV");
                //var strongChar = arr[i].substr(arr[i].toUpperCase().indexOf(val.toUpperCase()), val.length)
                b.innerHTML = arr[i].substr(0, arr[i].toUpperCase().indexOf(val.toUpperCase()), val.length) + "<strong>" + arr[i].substr(arr[i].toUpperCase().indexOf(val.toUpperCase()), val.length) + "</strong>" + arr[i].substr(val.length + arr[i].toUpperCase().indexOf(val.toUpperCase()), arr[i].length);
                if (i <= 618) {
                    var id = dataJson.coursera.learn[arrKhoaHoc[i]].id; //lấy id để thực hiện sự kiện click
                    b.innerHTML += "<input id='" + arrKhoaHoc[i] + "_" + id + "' onclick='chiTietKhoaHoc(" + dataJson.coursera.learn[arrKhoaHoc[i]].id + ")' type='hidden' value='" + arr[i] + "'>";

                }
                if (i > 618 && i <= 973) {
                    var id = dataJson.coursera.specializations[arrKhoaHoc[i]].id;
                    b.innerHTML += "<input id='" + arrKhoaHoc[i] + "_" + id + "' onclick='chiTietKhoaHoc(" + dataJson.coursera.specializations[arrKhoaHoc[i]].id + ")' type='hidden' value='" + arr[i] + "'>";

                }
                if (i > 973 && i <= 995) {
                    var id = dataJson.coursera.professional_certificates[arrKhoaHoc[i]].id;
                    b.innerHTML += "<input id='" + arrKhoaHoc[i] + "_" + id + "' onclick='chiTietKhoaHoc(" + dataJson.coursera.professional_certificates[arrKhoaHoc[i]].id + ")' type='hidden' value='" + arr[i] + "'>";

                }
            /*create a DIV element for each matching element:*/
               
                var obj = {
                    id: arrKhoaHoc[i] + "_" + id
                };
  
                /*insert a input field that will hold the current array item's value:*/
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    idC = this.getElementsByTagName("input")[0].id; //Lấy id của khóa học
                    chiTietKhoaHoc(obj);
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
            ///*check if the item starts with the same letters as the text field value:*/
            //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

            //}
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

///*An array containing all the country names in the world:*/
//var countries = [];
//for (var i = 0; i < _listCongTy.length; i++) {
//    countries.push(_listCongTy[i].Text)
//}
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("input_course"), khoaHoc_name, khoaHoc, dataJson);