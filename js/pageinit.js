/**
 * Created by zhanghaichao on 2017/9/2.
 */
;
$(function () {
    //模块首页
    $(document).on("pageInit", "#page-fixed-tab-infinite-scroll", function (e, id, page) {
        //弹出选择页面
        $(document).on('click', '.open-about', function () {
            var tabid = $(this).attr("data-tab");
            $(".tabs .tab").removeClass("active");
            $("#" + tabid).addClass("active");
            $(".buttons-tab .tab-link").removeClass("active");
            $("#head" + tabid).addClass("active");
            $.popup('.popup-about');
            loadList();
        });

        var loadList = function () {
            var tablistlength = $('.infinite-scroll .active .list-container li').length;
            if (tablistlength == null || tablistlength == 0) {
                addItems();
            }
        }
        var loading = false;

        function addItems() {
            // 生成新条目的HTML
            var html = '';
            ajaxUtil("/htmlindex/data/modeljson.json", {}, function (data) {
                if (data.success) {
                    if (data.length < 20) {
                        $('.infinite-scroll-preloader').find(".infinite-scroll-preloader").hide();
                    }
                    $.each(data, function (index, value) {
                        html += '<li class="item-content""><div class="item-inner"><div class="item-title">' + value['name'] + '</div></div></li>';
                    })
                    // 添加新条目
                    $('.infinite-scroll.active .list-container').append(html);
                }
            });
        }

        $(page).on('infinite', function () {
            // 如果正在加载，则退出
            if (loading) return;
            // 设置flag
            loading = true;
            // 模拟1s的加载过程
            setTimeout(function () {
                // 重置加载flag
                loading = false;
                addItems();
                $.refreshScroller();
            }, 1000);
        });
    });
    $.init();
});
