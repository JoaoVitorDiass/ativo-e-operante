function carregaDados() {

    // para usar na propria maquina
    const URL_TO_FETCH = "http://localhost:8080/apis/admin/get-orgaos"

    // para usar com o live server em outro pc
    // const URL_TO_FETCH = "http://192.168.0.135:8080/apis/admin/get-tipos";

    fetch(URL_TO_FETCH, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (!$.fn.dataTable.isDataTable('#orgaos')) {
            $('#orgaos').DataTable({
                data: result,
                columns: [
                    {
                        "data": "id",
                    },
                    {
                        "data": "nome",
                    },
                    {
                        "data": 'id',
                        render: function (data, type) {
                            if (type === 'display') {

                                return `<i class="fa-solid fa-trash text-lg" onclick="deletar(${data})">
                                    </i>
                                    <!--<i class="fa-solid fa-pen-to-square text-lg" onclick="Modal(${data}, 'Alterar')">
                                    </i>-->`
                            }

                            return data;
                        },
                    },
                ],
                "ordering": false,
                "searching": false,
                "pageLength": 7,
                "lengthChange": false,
                language: {
                    "info": "Exibindo de _START_ a _END_ de _TOTAL_ registros",
                    "infoEmpty": "",
                    "emptyTable": "Nenhum Tipo de denúncia foi encontrada!",
                    oPaginate: {
                        sNext: 'Próximo',
                        sPrevious: 'Anterior',
                        sFirst: 'Primeiro',
                        sLast: 'Último',
                    }
                },
                "drawCallback": function (settings) {
                    $(".paginate_button ").on("click", () => {
                        modifica_table();
                    })
                },
                "columnDefs": [
                    {
                        "targets": 0, // your case first column
                        "className": "text-center",
                        "width": "17%"
                    },
                    {
                        "targets": 1,
                        "className": "text-left",
                        "width": "70%"
                    },
                    {
                        "targets": 2,
                        "className": "text-right",
                        "width": "13%"
                    }
                ],
                rowReorder: true,
            });
        } else {
            let tabela = $('#tipoDenuncia').DataTable();
            tabela.clear();
            tabela.rows.add(result);
            tabela.draw();
        }
    })
    .catch(err => console.log(err));
}

function novo() {
    let formulario = `
    <div style="width: 86%; margin: auto;">
        <button type="button" style="margin-bottom: 20px; padding: 5px 30px; font-weight: bold;" class="btn btn-danger" onclick="voltar()">Voltar</button>
    </div>
    <form id="orgao" name="orgao" cellspacing="0" style="width:50%; margin: auto; margin-top: 50px">

        <h1 style="text-align: center; margin-bottom: 40px;">Novo Orgão</h1>

        <input type="hidden" id="id" name="id" value="">

        <!-- Text input -->
        <div class="form-outline mb-4">
            <input type="text" id="nome" name="nome" class="form-control" />
            <label class="form-label" for="titulo">Nome
                <span style="font-weight: bold; color: red;">*</span>
            </label>
        </div>

        <!-- Submit button -->
        <button type="button" onclick="enviarOrgao()" class="btn btn-primary btn-block mb-4">Enviar</button>
    </form>
    `
    $("body").empty()
    $("body").append(formulario)
}

function voltar() {
    document.location.reload()
}

function enviarOrgao(){ 
    if(validarCampos()) {
        
        var object = {};
        let formData=new FormData(document.querySelector("#orgao"));
        formData.forEach(function (value, key) {
            object[key] = value;
        });
        
        if(document.getElementById("id").value!=="")
        {
            object.id=document.getElementById("id").value;
            
        }
        var json = JSON.stringify(object);

        // para usar na propria maquina
        const URL_TO_FETCH = "http://localhost:8080/apis/admin/save-orgao"
        
        // para usar na outra maquina
        // const URL_TO_FETCH = "http://192.168.0.135:8080/apis/admin/save-orgao"
        
        fetch(URL_TO_FETCH, {
            method: 'POST',
            body: json,
            headers:{"content-type":"application/json"},
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            voltar()
        })
        .catch(err => console.log(err));
    }
}

function deletar(id) {
    // para usar na propria maquina
    const URL_TO_FETCH = "http://localhost:8080/apis/admin/del-orgao/"+id
    
    // para usar na outra maquina
    // const URL_TO_FETCH = "http://192.168.0.135:8080/apis/admin/del-tipo/"+id;
    fetch(URL_TO_FETCH, {
        method: 'GET',
    })
    .then(response => response.text())
    .then(result => {
        console.log(result)
        window.location.reload()
    })
    .catch(err => console.log(err));

}

function validarCampos() {
    
    if($("#nome").val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Campos Necessários!',
            html: "Descrição obrigatória!",
        })
        return false;
    }
    return true;
}

$(document).ready(() => {
    carregaDados()
})