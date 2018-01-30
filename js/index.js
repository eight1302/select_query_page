//分页展示数据
var page = 10;

//页面title（标题展示）
var title = '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 one">选择</div>'+
            '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 one id">序号</div>'+
			'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 one name">名字</div>'+
			'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 one age">年龄</div>'+
			'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 one school">毕业院校</div>'+
			'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 one professional">学习专业</div>'+
			'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 one operation">操作</div>';
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
 	var detail ='<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 page_detail">'+ 
                '<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 one">'+
                    '<input type="checkbox" name="items" value="'+obj.id+'" id="item">'+
                '</div>'+
				'<div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 one id">'+obj.id+'</div>'+
				'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 one name">'+obj.name+'</div>'+
				'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 one age">'+obj.age+'</div>'+
				'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 one school">'+obj.school+'</div>'+
				'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 one professional">'+obj.professional+'</div>'+
				'<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 one delete">删除</div>'+
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

//筛选条件
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

//查询方法
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

//查询条件
function query(name,item){
    if(name != ""){
        var query =[];
        $(".page_info").empty();
        $.each(item, function(idx,obj){
            if(name == obj.name || name == obj.id || name == obj.age || name == obj.school || name == obj.professional){ 
                query.push(item[idx]);
            }
        });
        spop({
            template: '查询详情',
            autoclose: 5000
        });
        page_func(query)
    }else{
         spop({
            template: '请输入查询信息!',
            autoclose: 5000
        });
	return false;    
    }
   
}

//选择功能
function batch(){
    //全选
    $(".all").click(function() {
        $("[name=items]:checkbox").each(function() {
            $(this).prop("checked", true);
        })
    });

    //取消
    $(".un_all").click(function() {
        $("[name=items]:checkbox").each(function() {
            $(this).prop("checked", false);
        })
    })


    //反选
    $(".reverse").click(function() {
        $("[name=items]:checkbox").each(function() {
            //如果当前复选框已选中，则则执行关闭
            if ($(this).prop("checked")) {
                $(this).prop("checked", false);
            }
            //否则选中 
            else {
                $(this).prop("checked", true);
            }
        });
    })
}

batch()

//批量删除
$(".batch_delete").on("click",function(){
    var signs = $("input[name='items']");
    var ids = [];
    $.each(signs,function(key,obj){
        if(obj.checked){
            var id = obj.value;
            ids.push(id);
        }
    });
    //删除数据
    if(ids.length >0){
        $.each(ids, function(idx,obj){  

            if($(".page_info").find("#item").val(obj)){
                $(".page_info").find("#item").parent().parent().remove();  
            }else{
                spop({
                    template: '批量删除失败',
                    autoclose: 3000
                });
            } 
        });
        spop({
            template: '批量删除成功',
            autoclose: 3000
        }); 
    }else{
        spop({
            template: '批量删除只能全选或反选,不选则不能删除!',
            autoclose: 3000
        });
    }
})

//展示浏览器信息
function getOs(){ 
    var isFirefoxVersion = navigator.userAgent,
        appCodeName = navigator.appCodeName,
        appName = navigator.appName,
        appVersion = navigator.appVersion,
        platform = navigator.platform,
        product =navigator.product,
        productSub = navigator.productSub,
        vendor =navigator.vendor;
    var date = {
        "isFirefoxVersion" : isFirefoxVersion,
        "appCodeName" : appCodeName,
        "appName" : appName,
        "appVersion" : appVersion,
        "platform" : platform,
        "product" : product,
        "productSub" : productSub,
        "vendor" : vendor
    }
    return date; 
}
//隐藏浏览器信息
$(".infomation").hide();
$(".browser").on('click',function(){
    $(".infomation").show();
    //页面提示信息
    var data = getOs()
    $(".isFirefoxVersion").html(data.isFirefoxVersion);
    $(".appCodeName").html(data.appCodeName);
    $(".appName").html(data.appName);
    $(".appVersion").html(data.appVersion);
    $(".platform").html(data.platform);
    $(".product").html(data.product);
    $(".productSub").html(data.productSub);
    $(".vendor").html(data.vendor);
     spop({
            template: '浏览器信息为：'+data.isFirefoxVersion+'!',
            autoclose: 5000
        });
})
