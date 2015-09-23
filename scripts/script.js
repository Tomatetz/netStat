(function () {

    var socket = io();

    socket.off().on('refresh', function(msg){
        refreshProgressBar(msg)
    });

    function checkType(quot){
        if(quot >90){
            return 'danger'
        } else if(quot >=75){
            return 'warning'
        } else if(quot >=50){
            return 'info'
        } else {
            return 'success'
        }
    }
    function makeProgressBar(name, use, total, j){
        var quot = (use/total*100).toFixed(2);
        return '<div class="progress"><div class="progress-bar progress-bar-'+checkType(quot)+' progress-bar-'+j+'" role="progressbar" aria-valuenow="'+quot+'"aria-valuemin="0" aria-valuemax="'+total+'" style="width:'+quot+'%">' +
            quot+'%</div></div>'
    }
    function makeServersList(response){
        $.each(response, function(i, server){
            $('.servers-ul').append('<li class="list-group-item server-item server-item-'+i+'"><span class="badge">'+server.host+'</span>'+
            server.stats.name +makeProgressBar(server.stats.name, server.stats.use, server.stats.total, i)+'<div class="panel licences-wrapper"><ul class="list-group licences-wrapper-ul"></ul></div></li>');
            $.each(server.stats.license, function(j, license){
                quotInner = (this.use/this.total*100).toFixed(2);
                $('.server-item-'+i+' .licences-wrapper-ul').append('<li class="list-group-item list-group-item-'+j+' list-group-item-'+checkType(quotInner)+'">'
                +this.name+'   <span class="pull-right"> ['+this.use+'/'+this.total+']</span></li>');
            });
        });
    }

    makeServersList(response);

    $('.servers-ul').off().on('click', '.server-item', function(){
        if($(this).hasClass('fired')){
            $(this).removeClass('fired');
        } else{
            $('*').removeClass('fired');
            $(this).addClass('fired');
        }
    });

    $('.progress-bar').off().on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        socket.emit('refresh');
        refreshProgressBar(response2)
    });
    function refreshProgressBar(resp){
        $.each(resp, function(i, server){
            server = server.stats;
            var quot = (server.use/server.total*100).toFixed(2);
            $('.progress-bar-'+i).removeClass('progress-bar-success progress-bar-danger progress-bar-warning progress-bar-info');
            $('.progress-bar-'+i).css('width', quot+'%').attr('aria-valuenow', quot).html(quot+'%').addClass('progress-bar-'+checkType(quot));
            $.each(server.license, function(j, license){
                quotInner = (this.use/this.total*100).toFixed(2);
                $('.server-item-'+i+' .list-group-item-'+j).html(this.name+'    <span class="pull-right"> ['+this.use+'/'+this.total+']</span>');
                $('.server-item-'+i+' .list-group-item-'+j).removeClass('list-group-item-success list-group-item-danger list-group-item-warning list-group-item-info');
                $('.server-item-'+i+' .list-group-item-'+j).addClass('list-group-item-'+checkType(quotInner));
            });
        });
    };
})();