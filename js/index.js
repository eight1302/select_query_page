//分页展示数据
var page = 10;

//页面title（标题展示）
var title = '<div class="col-md-2 col-sm-2 col-xl-2 id">序号</div>'+
			'<div class="col-md-2 col-sm-2 col-xl-2 name">名字</div>'+
			'<div class="col-md-2 col-sm-2 col-xl-2 age">年龄</div>'+
			'<div class="col-md-2 col-sm-2 col-xl-2 school">毕业院校</div>'+
			'<div class="col-md-2 col-sm-2 col-xl-2 professional">学习专业</div>'+
			'<div class="col-md-2 col-sm-2 col-xl-2 operation">操作</div>';
$(".title").append(title);

//分页函数

function page_func(date){
    $.each(date, function(idx,obj){
        if(idx<page){
            dateinfo(obj)
        }
    }); 
    var content=date.length;       //总数
    var pageTotal=Math.ceil(content/page);  //分页数量
    var html='<ul class="pagination" style="margin:0;" id="page2"></ul>';
    $(".page-left").append(html);
    Page({
        num:pageTotal,             //页码数
        startnum:1,
        pagesize:page,             //每页显示的数量
        elem:$('#page2'),       //指定的元素
        callback:function(n){   //回调函数 
            pagination(n,date);     
        }
    });
}

$.getJSON({  
    type: "GET",
    url:"../js/date.json",  
    async: false, 
    cache:false,
    dataType:"json", 
    success: function(e) {
       	if(e.date.date_list.length==0){
       		alert("暂无数据4！");
       		return;
       	}
       page_func(e.date.date_list)

       //筛选框
        $("#select_school").change(function(){
            var name = $(this).children('option:selected').val();
            spop({
                template: '查找的院校是'+name,
                autoclose: 5000
            });
            var item =e.date.date_list;
            select(name,item)
        });
    }
});

//表单数据
function dateinfo(obj){
 	var detail ='<div class="col-md-12 col-sm-12 col-xl-12 page_detail">'+ 
				'<div class="col-md-2 col-sm-2 col-xl-2 id">'+obj.id+'</div>'+
				'<div class="col-md-2 col-sm-2 col-xl-2 name">'+obj.name+'</div>'+
				'<div class="col-md-2 col-sm-2 col-xl-2 age">'+obj.age+'</div>'+
				'<div class="col-md-2 col-sm-2 col-xl-2 school">'+obj.school+'</div>'+
				'<div class="col-md-2 col-sm-2 col-xl-2 professional">'+obj.professional+'</div>'+
				'<div class="col-md-2 col-sm-2 col-xl-2 delete">删除</div>'+
			'</div>';
	$(".page_info").append(detail);
}

//页数控制
function pagination(num,list){
	$(".page_info").html('');
	$.each(list, function(idx,obj){
		if(idx>=((num-1)*page) && idx<(num*page)){
			dateinfo(obj);
		}
    });
}

//删除数据
$(".page_info").on('click','.delete',function(){
    var id= $(this).parent().find(".id").html();
    var name= $(this).parent().find(".name").html();
    var age= $(this).parent().find(".age").html();
    var school= $(this).parent().find(".school").html();
    var professional= $(this).parent().find(".professional").html();
    spop({
        template: '请确定要删除序号'+id+'名称'+name+'毕业院校'+school,
        autoclose: 3000
    });
    $(this).parent().remove();
    
})

var data = ["北京大学","清华大学","南开大学","北京邮电大学","东北工业大学","北京理工大学","北京交通大学","北京交通大学海滨学院"];
//筛选框展示
 $.each(data, function(idx,obj){
    var se_html = '<option value="'+obj+'">'+obj+'</option>'; 
    $(".select").append(se_html);
}); 

function select(name,item){
     var sol =[];
    $(".page_info").empty();
    $.each(item, function(idx,obj){
        var school = obj.school;
        if(name == school){ 
            sol.push(item[idx]);
        }
    }); 
    page_func(sol)
}

//查询条件
$(".query").on('click',function(){
    var name = $("#name").val();
    $.getJSON({  
        type: "GET",
        url:"../js/date.json",  
        async: false, 
        cache:false,
        dataType:"json", 
        success: function(e) {
            if(e.date.date_list.length==0){
                alert("暂无数据4！");
                return;
            }
           page_func(e.date.date_list)
           var item =e.date.date_list;
           query(name,item)
        }
    });
});

function query(name,item){
    spop({
        template: '查找的学生'+name,
        autoclose: 5000
    });
    var query =[];
    $(".page_info").empty();
    $.each(item, function(idx,obj){
        var person_name = obj.name;
        if(name == person_name){ 
            query.push(item[idx]);
        }
    }); 
    page_func(query)
}