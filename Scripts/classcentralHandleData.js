dataJson_classcentral = {};
webSource = [];
$.getJSON('https://raw.githubusercontent.com/danh9a99/API/main/export_data_coursera_classcentral_Final.json', function (json_classcentral) {
    dataJson_classcentral = json_classcentral;
    //xử lý sidebar
    
    for (cate of Object.keys(json_classcentral.classcentral)) {
        
        webSource.push(json_classcentral.classcentral[cate].webname);
    }

    for (cateChild of Object.keys(countCate(webSource))) {
        if (cateChild !== "") {
            document.getElementById('childTongHop').innerHTML += '<label class="ant-checkbox-wrapper"><span class="ant-checkbox"><input type="checkbox" class="ant-checkbox-input" value="learn" name="all[]"><span class="ant-checkbox-inner"></span></span><span>' + cateChild + ' (' + countCate(webSource)[cateChild] + ') ' + '</span></label >';
        }
    }
    
});

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
//Lấy số lượng khoá học cho từng loại

function countCate(arr) {
    var counts = {};
    arr.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    return counts;

}

//Xử lý sidebar
$(document).ready(function () {
    console.log(webSource);
    
});

