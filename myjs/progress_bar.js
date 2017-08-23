/**
 * Created by zxw on 2017/6/7.
 */
var progressBar=(function(){
    var $progress=null;
    var $timeout=null;
    var question_flag=false;
    var goal=0;
    var i=15;
    var answer;
    var question_All;
    var contacts;
    var nownumber=0;//现在的题目序号从0开始
    var count=100;
    function init()
    {
        $progress=$("#progress_bar");
        $timeout=$(".Time_out");
        question_All=new Array();
        for(var a=2;a<101;a++)
        {
            question_All.push(a);
        }
        getQuestion();
        timecount();
        clickbind();
        getQuestion();
    }
    function getQuestion(){
       question_All.sort(function(){
           return 0.5-Math.random();
       });
       question_All.length=25;
        var length=question_All.length;
       var json_question=JSON.stringify(question_All);
      // alert(json_question);
        var questionlist=$.ajax({
            url:"php/examination.php",
            async:true,
            type:"GET",
            datatype:"json",
            //traditional:true,
            contentType:"multipart/form-data",
            data:
            {
                    // json_question:question_All,
                   length:json_question
            },
            success:function() {
                contacts=JSON.parse(questionlist.responseText);
                //alert(questionlist.responseText);
                $("#main_question").text(nownumber+1+"."+contacts[nownumber].title);
                    $("#choose_a").text("A."+contacts[nownumber].a_option);
                    $("#choose_b").text("B."+contacts[nownumber].b_option);
                    $("#choose_c").text("C."+contacts[nownumber].c_option);
                    $("#choose_d").text("D."+contacts[nownumber].d_option);
                //alert(contacts);
            }
        });

    }//ajax 获取题目信息
    function timecount() {

        var timer=setInterval(function () {
            i=i-1;
             count=i*6.6;

            if(i<0)//超时情况
            {
                if(nownumber==24)
                {
                    window.location.href="result.html?"+goal;
                }
                i=15;
                count=100;
                nownumber++;
                $timeout.text(i+"S");
                $progress.css("width",count+"%");
                $(".Question_Num span").text(nownumber+1+"/25");
                $("#click_a").attr("src","img/buttona.png");
                $("#click_b").attr("src","img/buttonb.png");
                $("#click_c").attr("src","img/buttonc.png");
                $("#click_d").attr("src","img/buttond.png");//按钮恢复原样
                $("#main_question").text(nownumber+1+"."+contacts[nownumber].title);//获取题目
                $("#choose_a").text("A."+contacts[nownumber].a_option);
                $("#choose_b").text("B."+contacts[nownumber].b_option);
                $("#choose_c").text("C."+contacts[nownumber].c_option);
                $("#choose_d").text("D."+contacts[nownumber].d_option);//获取选项

            }
            $timeout.text(i+"S");
           $progress.css("width",count+"%");

        },1000);
    }
    //计算分数
    // function goal() {
    //     if(question_flag==true)
    //     {
    //         goal=goal+4;
    //         $(".Goal span").text(goal);
    //     }
    // }
    //点击事件绑定
    function clickbind(){
        $(".butt_wrap").on("click",function() {
            $("#Sure").css("visibility", "visible");
            if($(this).attr("index")=="A")
            {

                    $("#click_a").attr("src","img/buttonclicka.png");
                    $("#click_b").attr("src","img/buttonb.png");
                    $("#click_c").attr("src","img/buttonc.png");
                    $("#click_d").attr("src","img/buttond.png");
                    answer=$(this).attr("index");
            }
            if($(this).attr("index")=="B")
            {

                    $("#click_b").attr("src","img/buttonclickb.png");
                    $("#click_a").attr("src","img/buttona.png");
                    $("#click_c").attr("src","img/buttonc.png");
                    $("#click_d").attr("src","img/buttond.png");
                    answer=$(this).attr("index");
            }
            if($(this).attr("index")=="C")
            {

                    $("#click_c").attr("src","img/buttonclickc.png");
                    $("#click_b").attr("src","img/buttonb.png");
                    $("#click_a").attr("src","img/buttona.png");
                    $("#click_d").attr("src","img/buttond.png");
                    answer=$(this).attr("index");

            }
            if($(this).attr("index")=="D")
            {

                    $("#click_d").attr("src","img/buttonclickd.png");
                    $("#click_b").attr("src","img/buttonb.png");
                    $("#click_c").attr("src","img/buttonc.png");
                    $("#click_a").attr("src","img/buttona.png");
                    answer=$(this).attr("index");
            }
            //alert(answer);
        });
        $("#Back").on("click",function(){
            window.location.href="my_index.html";
        });
        $("#Sure").on("click",function(){

            if(answer==$.trim(contacts[nownumber].answer))
            {
                question_flag=true;
                $(".information").css("display","block");
                $(".information img").attr("src","img/right.png");//提示正确信息的替换
                goal=goal+4;
                $(".goal span").text("得分:"+goal);
                if(answer=="A")
                {
                    $("#click_a ").attr("src","img/green-a.png");//正确时按钮颜色变绿
                }
                if(answer=="B")
                {
                    $("#click_b ").attr("src","img/green-b.png");
                }
                if(answer=="C")
                {
                    $("#click_c ").attr("src","img/green-c.png");
                }
                if(answer=="D")
                {
                    $("#click_d ").attr("src","img/green-d.png");
                }
                //goal();
            }//回答正确
            else{
                question_flag=false;
                $(".information").css("display","block");
                $(".information img ").attr("src","img/wrong.png");
                if(answer=="A")
                {
                    $("#click_a ").attr("src","img/red-a.png");
                }
                if(answer=="B")
                {
                    $("#click_b ").attr("src","img/red-b.png");
                }
                if(answer=="C")
                {
                    $("#click_c ").attr("src","img/red-c.png");
                }
                if(answer=="D")
                {
                    $("#click_d ").attr("src","img/red-d.png");
                }
            }//回答错误
            if(nownumber==24)
            {
                window.location.href="result.html?goal="+goal;
            }
            nownumber++;
            setTimeout(function(){
                $(".information").css("display","none");
                $("#click_a").attr("src","img/buttona.png");
                $("#click_b").attr("src","img/buttonb.png");
                $("#click_c").attr("src","img/buttonc.png");
                $("#click_d").attr("src","img/buttond.png");//恢复原样
                $("#main_question").text(nownumber+1+"."+contacts[nownumber].title);
                $("#choose_a").text("A."+contacts[nownumber].a_option);
                $("#choose_b").text("B."+contacts[nownumber].b_option);
                $("#choose_c").text("C."+contacts[nownumber].c_option);
                $("#choose_d").text("D."+contacts[nownumber].d_option);//替换题目和选项
            },500);

            i=15;
            count=100;
            $timeout.text(i+"S");
            $progress.css("width",count+"%");
            $(".Question_Num span").text(nownumber+1+"/25");
        });
    }
    return init;
})();
progressBar();
