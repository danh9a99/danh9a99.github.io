
function makeJobForThisCourse(obj) {

    courseMeta = obj.id.split('__')[0];
    type = obj.id.split('__')[1];
    window.location.href = "./detail-course.html?course=" + courseMeta +"&type="+type;
}
