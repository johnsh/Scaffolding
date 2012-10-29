<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="chrome=1">
        <title>test-php</title>
        <!-- Libs -->
    </head>
    <body>
    </body>
    <!-- Libs -->
    <script src="scaffold.js"></script>
</html>


<script id="listaplantilladocumentotemplate" type="text/x-jquery-tmpl"> 
    <h1>Plantillas</h1>
    <h3>Lista</h3>
    <!--<a class="btn btn-primary" href="#" id="scaffold_nuevo_plantilladocumento">
        <i class="icon-plus icon-white" ></i> Nuevo registro</a>
    <br /> <br />    
    <form class="well form-search">
        <input type="text" class="input-medium search-query" id="scaffold_bq_plantilladocumento">
        <button type="submit" class="btn" id="scaffold_buscar_plantilladocumento">Buscar</button>
    </form>
    <table class="table table-bordered">
        <tr>
            {{each plantilladocumento_th}}
            <th>{{= th}}</th>
            {{/each}}
            <th></th>
        </tr>
        {{each plantilladocumento_ta}}
        <tr>
            <td>{{= nombre}}</td>
            <td>{{= descripcion}}</td>
            <td>{{= tipoplantilladocumento_nombre}}</td>
            <td>
                <a class="btn btn-primary" href="#" id="scaffold_ver_plantilladocumento_{{= idplantilladocumento_pk}}_1">
                    <i class="icon-zoom-in icon-white" ></i>Ver</a> 

                <a class="btn btn-primary" href="#" id="scaffold_modificar_plantilladocumento_{{= idplantilladocumento_pk}}_2">
                    <i class="icon-pencil icon-white" ></i>Modificar</a>

                <a class="btn btn-danger" href="#" id="scaffold_eliminar_plantilladocumento_{{= idplantilladocumento_pk}}_3">
                    <i class="icon-remove icon-white" ></i>Eliminar</a>     

                <a class="btn btn-primary" href="#" style="display: none" id="scaffold_usar_plantilladocumento_{{= idplantilladocumento_pk}}_4">
                    <i class="icon-ok icon-white" ></i></a>         
            </td>
        </tr>   
        {{/each}}
    </table>-->
    <div class="pagination" id="paginacion" style="display: none">
    </div>
</script>

<script id="nuevoplantilladocumentotemplate" type="text/x-jquery-tmpl"> 
    <h1>Plantillas</h1>
    <h3>nuevo</h3>

    <a class="btn btn-primary" href="#" id="scaffold_post_nuevo_plantilladocumento">
        <i class="icon-plus icon-white" ></i> Nuevo registro</a>

</script>

<script id="editarplantilladocumentotemplate" type="text/x-jquery-tmpl"> 
    <h1>Plantillas</h1>
    <h3>modificar</h3>

    <a class="btn btn-primary" href="#" id="scaffold_post_modificar_plantilladocumento">
        <i class="icon-pencil icon-white" ></i>Modificar registro</a>

</script>
<script id="verplantilladocumentotemplate" type="text/x-jquery-tmpl"> 
    <h1>Plantillas</h1>
    <h3>Ver</h3>
</script>
