$(document).ready(function(){
    // Validate username
    // $("#username").change(function() {
    //     $.ajax({
    //         type: 'POST',
    //         url: $("#form-register").data("url"),
    //         data: {
    //             csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val(), // Bắt buộc phải có CSRF TOKEN
    //             username: $(this).val()
    //         },
    //         success: function (data) {
    //             $("#username").removeClass("is-invalid");
    //             $("#username").addClass("is-valid");
    //             $("#username").parent().append(`<div class="valid-feedback">${data.message}</div>`);
    //         },
    //         error: function ($xhr, textStatus, erroThrown) {
    //             $("#username").removeClass("is-valid");
    //             $("#username").addClass("is-invalid");
    //             $("#username").parent().append(`<div class="invalid-feedback">${$xhr.responseJSON.message}</div>`);
    //         }
    //     })
    // });
    
    // // Password và confirm_password phải giống nhau (client validation)
    // $("#password").change(function () {
    //     var password = $(this).val();
    //     if (password.length < 6) {
    //         $(this).removeClass("is-valid");
    //         $(this).addClass("is-invalid");
    //         $(this).parent().append(`<div class="invalid-feedback">Mật khẩu quá ngắn</div>`);
    //     }
    //     else {
    //         $(this).removeClass("is-invalid");
    //         $(this).addClass("is-valid");
    //         $(this).parent().append(`<div class="valid-feedback">OK</div>`);
    //     }
    // });
    // $("#confirm_password").change(function () {
    //     var password = $("#password").val();
    //     var confirm_password = $(this).val();
    //     if (password != confirm_password) {
    //         $(this).removeClass("is-valid");
    //         $(this).addClass("is-invalid");
    //         $(this).parent().append(`<div class="invalid-feedback">Nhập lại mật khẩu không khớp</div>`);
    //     }
    //     else {
    //         $(this).removeClass("is-invalid");
    //         $(this).addClass("is-valid");
    //         $(this).parent().append(`<div class="valid-feedback">OK</div>`);
    //     }
    // });
    // $("#first_name").change(function () {
    //     var first_name = $(this).val();
    //     if (first_name.length < 2) {
    //         $(this).removeClass("is-valid");
    //         $(this).addClass("is-invalid");
    //         $(this).parent().append(`<div class="invalid-feedback">Tên quá ngắn</div>`);
    //     }
    //     else {
    //         $(this).removeClass("is-invalid");
    //         $(this).addClass("is-valid");
    //         $(this).parent().append(`<div class="valid-feedback">OK</div>`);
    //     }
    // });
    // $("#last_name").change(function () {
    //     var last_name = $(this).val();
    //     if (last_name.length < 2) {
    //         $(this).removeClass("is-valid");
    //         $(this).addClass("is-invalid");
    //         $(this).parent().append(`<div class="invalid-feedback">Họ quá ngắn</div>`);
    //     }
    //     else {
    //         $(this).removeClass("is-invalid");
    //         $(this).addClass("is-valid");
    //         $(this).parent().append(`<div class="valid-feedback">OK</div>`);
    //     }
    // });

    $("#btn_login").click(function() {
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            type: 'POST',
            url: "https://lehungvi.pythonanywhere.com/api/token",
            contentType: "application/json", 
            data: `{"username": "${$("#username").val()}","password": "${$("#password").val()}"}`,
            success: function (data) {
                sessionStorage.setItem('access',data.access);
                sessionStorage.setItem('refresh',data.refresh);
                document.cookie = `access-token=${data.access};`;
                document.cookie = `refresh-token=${data.refresh};`;
                $("#exampleModal").modal('hide');
                $(".toast-body").text("Đăng nhập thành công");
                $('#liveToast').toast('show');
            },
            error: function ($xhr, textStatus, erroThrown) {
                $("#exampleModal").modal('hide');
                $(".toast-body").text($xhr.responseJSON.detail);
                $('#liveToast').toast('show');
            }
        })
    });

    $("#functions_view").click(function() {
        $("#data_table").text('');
        $(".loader").show();
        $.ajax({
            type: 'GET',
            url: "https://lehungvi.pythonanywhere.com/api/reporters",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
            success: function (data) {
                console.log(data);
                let dataHtml = '';
                data.forEach((item, index) => {
                    dataHtml += `<tr>
                      <td>${index + 1}</td>
                      <td>${item.first_name}</td>
                      <td>${item.last_name}</td>
                      <td>${item.email}</td>
                      <td><a class="view_detail" data-id="${item.id}"><i class="bi bi-eye"></i></a> 
                      </td>
                    </tr>`;
                });
                $("#data_table").append(dataHtml);
                $(".loader").hide();
            },
            error: function ($xhr, textStatus, erroThrown) {
                console.log($xhr.responseJSON);
                // $("#exampleModal").modal('hide');
                // $(".toast-body").text($xhr.responseJSON.detail);
                // $('#liveToast').toast('show');
                $(".loader").hide();
            }
        })
    });

    $("#classes_view").click(function() {
        $("#data_table").text('');
        $(".loader").show();
        $.ajax({
            type: 'GET',
            url: "https://lehungvi.pythonanywhere.com/api/reporters-class",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
            // beforeSebd: function(xhr) {
            //     xhr.setRquestHeader('Authorization', `Bearer ${sessionStorage.getItem('access')}`)
            // },
            success: function (data) {
                console.log(data);
                let dataHtml = '';
                data.forEach((item, index) => {
                    dataHtml += `<tr>
                      <td>${index + 1}</td>
                      <td>${item.first_name}</td>
                      <td>${item.last_name}</td>
                      <td>${item.email}</td>
                      <td><a href="http://localhost:8000/api/reporter-class/${item.id}" class="view_detail" data-id="${item.id}"><i class="bi bi-eye"></i></a> 
                      </td>
                    </tr>`;
                });
                $("#data_table").append(dataHtml);
                $(".loader").hide();
            },
            error: function ($xhr, textStatus, erroThrown) {
                console.log($xhr.responseJSON);
                $(".loader").hide();
                // $("#exampleModal").modal('hide');
                // $(".toast-body").text($xhr.responseJSON.detail);
                // $('#liveToast').toast('show');
            }
        })
    });

    $(document).on('click','.view_detail',function(){
        // // alert($(this).data("id"));
        // $("#modalDetail #fullname").text(
        //     `${$(this).parent().parent().children('td').eq(1).text()} ${$(this).parent().parent().children('td').eq(2).text()}`
        // );
        // $("#modalDetail #email").text(`${$(this).parent().parent().children('td').eq(3).text()}`);
        // $("#modalDetail").modal('show');
        $(".loader").show();
        $.ajax({
            type: 'GET',
            url: `https://lehungvi.pythonanywhere.com/api/reporter/${$(this).data('id')}`,
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
            success: function (data) {
                $("#modalDetail #fullname").text(
                    `${data.first_name} ${data.last_name}`
                );
                $("#modalDetail #email").text(`${data.email}`);
                $("#modalDetail").modal('show');
                $(".loader").hide();
            },
            error: function ($xhr, textStatus, erroThrown) {
                console.log($xhr.responseJSON);
                $(".loader").hide();
                // $("#exampleModal").modal('hide');
                // $(".toast-body").text($xhr.responseJSON.detail);
                // $('#liveToast').toast('show');
            }
        })
    });

    $("#btn_add").click(function() {
        var first_name = $("#first_name").val();
        var last_name = $("#last_name").val();
        var email = $("#email").val();
        $.ajax({
            type: 'POST',
            url: "https://lehungvi.pythonanywhere.com/api/add-reporters",
            contentType: "application/json",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('access')}`
            },
            data: `
                {
                    "first_name": "${$("#modalAddNew #first_name").val()}",
                    "last_name": "${$("#modalAddNew#last_name").val()}", 
                    "email": "${$("#modalAddNew #email").val()}"
                }
            `,
            success: function (data) {
                $(".toast-body").text("Thêm thành công");
                $('#liveToast').toast('show');
            },
            error: function ($xhr, textStatus, erroThrown) {
                $(".toast-body").text($xhr.responseJSON.detail);
                $('#liveToast').toast('show');
            }
        })
    });
});
