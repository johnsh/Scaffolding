"use estric";
scaffold = function(){
    var scaffold = this;
    // Configuracion global
    scaffold.config = {
        "tmpl" : "core/vistas/cruds/",
        "reemplazar" : "#div_dinamico",
        "controller" : "Crud",
        "ext" : ".jsp",
        "acciones" :  {
            "nuevo" : true,
            "ver" : true,
            "modificar" : true,
            "eliminar" : true,
            "usar" : false
        }
    },
    // Paginador pagina actual;
    scaffold.pag = 1;
    // Extender configuracion.
    scaffold.configEx = function(config) {
        $.extend( scaffold.config, config );
        
    },
    // post de configuraciones.
    
    scaffold.postlista = {},
    scaffold.postnuevo = {},
    scaffold.posteditar = {},
    scaffold.postver = {},
    scaffold.postusar = {},
    scaffold.posteliminar = {},
    
    
    // Callbacks activable para modificar el post de ver,modificar,eliminar
    scaffold.postCall = function(){},
    // Callbacks activables al renderizar la vista
    scaffold.renderListaCall = function(){},
    scaffold.renderVerCall = function(){},
    scaffold.renderNuevoCall = function(data){},
    scaffold.renderEditarCall = function(data){},
    scaffold.renderEliminarCall = function( data ){},
    scaffold.renderUsarCall = function( data ) {},
    // Callbacks que permiten modificar el valor obtenido en el modelo
    scaffold.usardataCall = function( data ) {
        return scaffold.usardata = data;    
    },
    scaffold.editardataCall = function( data ) {
        return scaffold.editardata = data;    
    },
    scaffold.nuevodataCall = function( data ) {
        return scaffold.nuevodata = data;    
    },
    scaffold.listadataCall = function( data ) {
        return scaffold.listadata = data;  
    },
    scaffold.verdataCall = function( data ) {
        return scaffold.verdata = data;  
    },
    
    //  Fin callbacks 
    
    // Callbacks post_nuevo ( cuando se envia el formulario para registrar un nuevo dato )
    scaffold.postnuevodata = function(){},
    scaffold.postnuevoCall = function(data){
        
    },
    // Callbacks post_modificar ( cuando se envia el formulario para modificar un dato )
    scaffold.postmodificardata = function(){},
    scaffold.postmodificarCall = function() {
        
    }
    
    scaffold.init = function(call){
        scaffold.vistasCargar(function() {
            call();
        })
    },
    scaffold.eventos = function() {
        $("a[id*='scaffold_post_nuevo_"+ scaffold.config.modelo.ta +"']").click( function(e) {
            scaffold.modelo(scaffold.postnuevoCall, scaffold.postnuevodata());
            e.preventDefault();
            e.stopPropagation();
        });
        $("a[id*='scaffold_post_modificar_"+ scaffold.config.modelo.ta +"']").click( function(e) {
            scaffold.modelo(scaffold.postmodificarCall, scaffold.postmodificardata());
            e.preventDefault();
            e.stopPropagation();
        });
        $("a[id*='scaffold_nuevo_"+ scaffold.config.modelo.ta +"']").click( function(e) {
            Core.r("scaffold/nuevo/" +scaffold.config.modelo.ta); 
            e.preventDefault();
            e.stopPropagation();
        });
        $("a[id*='scaffold_modificar_"+ scaffold.config.modelo.ta +"']").click(function(e) {
            var id = this.id.split("_");
            $.extend( scaffold.posteditar, scaffold.postCall( id[ 3 ], id[ 1 ]) );
            Core.r("scaffold/editar/" + scaffold.config.modelo.ta ); 
            e.preventDefault();
            e.stopPropagation();
        });
        $("a[id*='scaffold_ver_"+ scaffold.config.modelo.ta +"']").click(function(e) {
            var id = this.id.split("_");
            $.extend( scaffold.postver, scaffold.postCall( id[ 3 ], id[ 1 ]) );
            Core.r("scaffold/ver/" + scaffold.config.modelo.ta ); 
            e.preventDefault();
            e.stopPropagation();
        });
        
        
        $("a[id*='scaffold_eliminar_"+ scaffold.config.modelo.ta +"']").click( function(e) {
            var id = this.id.split("_");
            $.extend( scaffold.posteliminar, scaffold.postCall( id[ 3 ], id[ 1 ] ) );
            scaffold.eliminar();
            e.preventDefault();
            e.stopPropagation();
        });
        $("a[id*='scaffold_usar_"+ scaffold.config.modelo.ta +"']").click(function(e) {
            var id = this.id.split("_");
            $.extend( scaffold.postusar, scaffold.postCall( id[ 3 ], id[ 1 ]) );
            scaffold.usar();
            e.preventDefault();
            e.stopPropagation();
        });
        $("button[id*='scaffold_buscar_"+ scaffold.config.modelo.ta +"']").click(function(e) {
            $.extend( scaffold.postlista, {
                "bu" : $("#scaffold_bq_" + scaffold.config.modelo.ta).val()
            } );
            scaffold.lista();
            e.preventDefault();
            e.stopPropagation();
        });
        $("a[id*='pag_"+ scaffold.config.modelo.ta +"_']").click(function(e) {
            var p = this.id.split("_");
            $.extend( scaffold.postlista, {
                "pa" : p[ 2 ]
            } );
            scaffold.pag = p[ 2 ];
            scaffold.lista();
            e.preventDefault();
            e.stopPropagation();
        });
        
    },
    scaffold.usar = function() {
        scaffold.modelo(function(data){
            var dat = scaffold.usardataCall( data );
            scaffold.renderUsarCall( dat );
        }, scaffold.postusar);  
    },
    scaffold.eliminar = function() {
        Core.confirmacion({
            'titulo' : 'Confirmacion de eliminaci&oacute;n',
            'cuerpo' : 'Realmente desea eliminar el registro?'
        }, function(){
            scaffold.modelo(function( data ){
                if( ! data.error ) {
                    scaffold.lista();
                }
                scaffold.renderEliminarCall( data );
            }, scaffold.posteliminar);
        }, function() {
                    
            })
    },
    scaffold.ver = function() {
        $(scaffold.config.reemplazar).html("");
        scaffold.modelo(function(data){
            var dat = scaffold.verdataCall( data );
            Core.lpnl(
                scaffold.config.reemplazar, "#ver" + scaffold.config.modelo.ta +"template",
                dat, function(){
                    scaffold.renderVerCall( dat );
                })
        }, scaffold.postver);    
    },
    scaffold.pre_editar = function(post, call, his) {
        scaffold.init(  function() {
            scaffold.posteditar = post;
            if( his ){
                Core.r("scaffold/editar/" + scaffold.config.modelo.ta);
            }
            call();
        } )  
    },
    scaffold.editar = function() {
        $(scaffold.config.reemplazar).html("");
        scaffold.modelo(function(data){
            var dat = scaffold.editardataCall( data );
            Core.lpnl(
                scaffold.config.reemplazar, "#editar" + scaffold.config.modelo.ta +"template",
                dat, function(){
                    scaffold.renderEditarCall( dat );
                    scaffold.eventos();
                })
        }, scaffold.posteditar);    
    },
    scaffold.pre_nuevo = function(post, call, his) {
        scaffold.init(  function() {
            scaffold.postnuevo = post;
            if( his ){
                Core.r("scaffold/nuevo/" + scaffold.config.modelo.ta);
            }
            call();
        } ) 
    },
    scaffold.nuevo = function() {
        $( scaffold.config.reemplazar ).html("");
        scaffold.modelo(function(data){
            var dat = scaffold.nuevodataCall( data );
            Core.lpnl(
                scaffold.config.reemplazar, "#nuevo" + scaffold.config.modelo.ta +"template",
                dat, function(){
                    scaffold.renderNuevoCall(dat);
                    scaffold.eventos();
                })
        }, scaffold.postnuevo);
    },
    // Obtiene el modelo, json
    scaffold.modelo = function(call, post) {
        try{
            $.post(scaffold.config.controller, $.extend( {}, scaffold.config.modelo, post ), function( data ){
                call( data );
            }, "json")
            return true;
        } catch( e ) {
            console.log("Error modelo " + e);
            return false;
        }
    },
    scaffold.pre_lista = function( post, call, his){
        scaffold.init( function() {
            scaffold.postlista = post;
            if( his ){
                Core.r("scaffold/lista/" + scaffold.config.modelo.ta);
            }
            call();
        } )
    },
    scaffold.lista = function() {
        $( scaffold.config.reemplazar ).html("");
        scaffold.modelo(function(data){
            var dat = scaffold.listadataCall( data );
            Core.lpnl(
                scaffold.config.reemplazar, "#lista" + scaffold.config.modelo.ta +"template",
                dat, function(){
                    scaffold.renderListaCall(); 
                    scaffold.paginar( dat );
                    scaffold.eventos();
                    scaffold.acciones();
                    scaffold.busqueda(dat);
                    
                })
        }, scaffold.postlista);
    },
    scaffold.vistasCargar = function( call) {
        try{
            Core.lp_t_temp(
                scaffold.config.tmpl + scaffold.config.modelo.ta + ".tmpl" + scaffold.config.ext, 
                scaffold.config.modelo.ta, function() {
                    call();
                })
        } catch( e ) {
            console.log("Error cargar plantilla : " + e);
        }
        
    },
    scaffold.val = function(  data, call ) {
        try{
            Core.v(data, scaffold.config.modelo.ta);
            if( data.error ) {
                Core.noty({
                    "text" : data.m, 
                    "type" : "error"
                });
                call(data.error)
            } else {
                Core.noty({
                    "text" : data.m
                });
                call(data.error);
            
            }
        } catch( e ) {
            console.log("Error val :" + e);
        }
    },
    scaffold.acciones = function() {
        $.each( scaffold.config.acciones, function( c, v ) {
            var r = $("a[id*='scaffold_" + c + "_" + scaffold.config.modelo.ta +"']");
            if(  v ) {
                r.show();
            } else {
                r.hide();
            }
        } )
        
        
    },
    scaffold.click = function(id, call) {
        $(id).live("click", function(e) {
            call();
            e.stopPropagation();
            e.preventDefault();
        })
    },
    scaffold.paginar = function( data ){
        try{
            // cant -> Cantidad de resultados ( todos )
            // pa -> Pagina actual
            // cantpag -> Cantidad de resultados por pagina
            var cant = data.cant, cantpag = data.cantpag;
            // Cantidad de paginaciones a mostrar
            var pag = scaffold.cantPaginas(cant, cantpag);
            if( scaffold.mostrarPaginacion(pag) ) {
                var pag_dom = $("#paginacion");
                pag_dom.show();
                if( scaffold.linkAtras(scaffold.pag) ) {   
                    pag_dom.append('<li><a href="#" id="pag_' + scaffold.config.modelo.ta + "_" + (parseInt(scaffold.pag) - 1)  +'"><<</a></li>');
                }
                for( var n = 1; n <= pag;  n++){
                    pag_dom.append('<li '+ ( n == scaffold.pag ? 'class="active"' : '' ) +'><a href="#" id="pag_' + scaffold.config.modelo.ta + "_" +n +'">'+ n +'</a></li>');
                }
                if( scaffold.linkAde(scaffold.pag, pag) ){
                    pag_dom.append('<li><a href="#" id="pag_' + scaffold.config.modelo.ta + "_" + (parseInt(scaffold.pag) + 1)  +'">>></a></li>');
                }
            
            
            }
        } catch( e ) {
            console.log("Error paginacion: " + e);
        }
        
    },
    scaffold.cantPaginas = function( cant, cantpag ){
        var pag = Math.ceil(( cant / cantpag ));
        return pag;
    },
    scaffold.mostrarPaginacion = function(pag) {
        return ( pag > 1 ? true : false );
    },
    scaffold.linkAtras = function(pagActual) {
        return ( parseInt(pagActual) - 1 > 0 ? true : false );
    },
    scaffold.linkAde = function( pagActual, pag ) {
        return ( (parseInt(pagActual) + 1) <= pag ? true : false );
    }
    scaffold.busqueda = function( data ) {
        try{
            if( data.m == undefined || data.m == "" ){
                return;
            }
            Core.m_noty(data);
        } catch( e ) {
            console.log("Error busqueda: " + e);
        }
        
    }
    
}


