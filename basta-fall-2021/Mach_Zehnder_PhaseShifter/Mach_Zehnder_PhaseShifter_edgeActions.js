/*  Copyright 2015, University of St Andrews QuVis Interactive Simulations
jQuery JavaScript Library v2.0.n Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors http://jquery.com/ Released under the MIT license http://jquery.org/license
edge Adobe Edge Animate JavaScript Library v3.0 Copyright 2014 Adobe Systems Inc. and its licensors. Released under the CC BY-NC-SA license, creativecommons.org/licenses   
fastclick.js Version: 1.0.6 Copyright (c) 2014 The Financial Times Ltd. https://github.com/ftlabs/fastclick Released under the MIT license https://github.com/ftlabs/fastclick/blob/master/LICENSE
normalize.css v3 Copyright (c) Nicolas Gallagher and Jonathan Neal https://github.com/necolas/normalize.css Released under the MIT license https://github.com/necolas/normalize.css/blob/master/LICENSE.md
*/

(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;var save={};function send_single_photon(e){var comp=AdobeEdge.getComposition(compId);comp.getSymbols('photon_path')[0].play();}
function send_continuous_photons(e){var send_photons=$('#Stage_send_continuous_button_label').text()=="Continuous Fire";$('#Stage_send_continuous_button_label').text(send_photons?"Stop Continuous Fire":"Continuous Fire");!send_photons?sym_enable($('#Stage_send_single_button')):sym_disable($('#Stage_send_single_button'));if(send_photons)send_single_photon(e);}
function setup_mode_event(e){var insert_filters=$('#Stage_insert_filters_button_label').text()=="Remove Filters";var insert_shifter=$('#Stage_insert_shifter_button_label').text()=="Remove Phase-Shifter";if(e){if(e.currentTarget.id=='Stage_insert_filters_button')insert_filters=!insert_filters;if(e.currentTarget.id=='Stage_insert_shifter_button')insert_shifter=!insert_shifter;}
setup_mode(insert_filters,insert_shifter);save.insert_filters=insert_filters;save.insert_shifter=insert_shifter;phase_shift_event(null);phase_shift_send(null);}
function setup_mode(insert_filters,insert_shifter){$('#Stage_insert_filters_button_label').text(insert_filters?"Remove Filters":"Filters (block E/2)");$('#Stage_insert_shifter_button_label').text(insert_shifter?"Remove Phase-Shifter":"Insert Phase-Shifter");insert_filters?$('#Stage_filters').show():$('#Stage_filters').hide();if(insert_shifter){sym_enable($('#Stage_phase_slider'));$('#Stage_shifter').show();$('#Stage_label_matrix_shifter').show();$('#Stage_label_state_shifter').show();$('#Stage_label_state_splitter2').show();$('#Stage_label_state2').hide();}
else{sym_disable($('#Stage_phase_slider'));$('#Stage_shifter').hide();$('#Stage_label_matrix_shifter').hide();$('#Stage_label_state_shifter').hide();$('#Stage_label_state_splitter2').hide();$('#Stage_label_state2').show();}}
function phase_shift_event(e){var phase_value=$('#Stage_phase_slider').data('val')/10;phase_shift(phase_value);save.phase_value=phase_value;if(!$('#Stage_phase_slider.active').length)phase_shift_send(null);}
function phase_shift(phase_value){var stage=AdobeEdge.getComposition(compId).getStage();stage.getSymbol('photon_path').stop(0);stage.getSymbol('detector_flash_up').stop(0);stage.getSymbol('detector_flash_down').stop(0);var prob_up=1;var prob_down=0;if($('#Stage_shifter').css('display')=='block'){prob_up=Math.pow(Math.cos(phase_value*Math.PI/2),2);prob_down=Math.pow(Math.sin(phase_value*Math.PI/2),2);}
$('#Stage_setup_shifter_object').css('width',(12+(phase_value-1)*5)+'px');$('#Stage_prob_up').text(Math.round(prob_up*100)+"%");$('#Stage_prob_down').text(Math.round(prob_down*100)+"%");sym_val($('#Stage_phase_slider'),phase_value*10);$('#Stage_matrix_shifter_phase').text(phase_value.toFixed(1));$('#Stage_state_shifter_phase').text(phase_value.toFixed(1));$('#Stage_state_splitter2_phase1').text(phase_value.toFixed(1));$('#Stage_state_splitter2_phase2').text(phase_value.toFixed(1));}
$(document).on('mouseup touchend',function(e){if($('#Stage_phase_slider.active').length)phase_shift_send(null);});function phase_shift_send(e){var send_photons=$('#Stage_send_continuous_button_label').text()!="Continuous Fire";if(send_photons)send_single_photon(null);}
function show_labels_event(e){var show_probabilities=$('#Stage_show_probabilities_checkbox').hasClass('selected');var show_state=$('#Stage_show_state_checkbox').hasClass('selected');var show_matrix=$('#Stage_show_matrix_checkbox').hasClass('selected');show_labels(show_probabilities,show_state,show_matrix);save.show_probabilities=show_probabilities;save.show_state=show_state;save.show_matrix=show_matrix;}
function show_labels(show_probabilities,show_state,show_matrix){show_probabilities?sym_select($('#Stage_show_probabilities_checkbox')):sym_deselect($('#Stage_show_probabilities_checkbox'));show_state?sym_select($('#Stage_show_state_checkbox')):sym_deselect($('#Stage_show_state_checkbox'));show_matrix?sym_select($('#Stage_show_matrix_checkbox')):sym_deselect($('#Stage_show_matrix_checkbox'));show_probabilities?$('#Stage_label_probabilities').show():$('#Stage_label_probabilities').hide();show_state?$('#Stage_label_state').show():$('#Stage_label_state').hide();show_matrix?$('#Stage_label_matrix').show():$('#Stage_label_matrix').hide();}
function step_functions(step){clearTimeout(AdobeEdge.step_animation);switch(step){case 1:case 2:setup_mode(0,0);phase_shift(1);break;case 3:setup_mode(1,1);phase_shift(1);send_single_photon(null);break;case 4:setup_mode(0,0);phase_shift(1);send_single_photon(null);break;case 5:setup_mode(0,1);phase_shift(1);break;case 6:setup_mode(0,1);function step6_animation(){phase_shift(1.4);$('#Stage_steps_step6_phase').text('1.4');$('#Stage_steps_step6_prob_up').text('35%');$('#Stage_steps_step6_prob_down').text('65%');AdobeEdge.step_animation=setTimeout(function(){phase_shift(1.6);$('#Stage_steps_step6_phase').text('1.6');$('#Stage_steps_step6_prob_up').text('65%');$('#Stage_steps_step6_prob_down').text('35%');AdobeEdge.step_animation=setTimeout(function(){phase_shift(1.8);$('#Stage_steps_step6_phase').text('1.8');$('#Stage_steps_step6_prob_up').text('90%');$('#Stage_steps_step6_prob_down').text('10%');AdobeEdge.step_animation=setTimeout(function(){step6_animation();},2000);},2000);},2000);}
step6_animation();break;}}
function sym_features(){$('#Stage').css({'-webkit-user-select':'none','-moz-user-select':'none','-ms-user-select':'none','user-select':'none'});if(sym_ie()==9){makeUnselectable($('#Stage')[0]);function makeUnselectable(node){if(node.nodeType==1)node.setAttribute("unselectable","on");var child=node.firstChild;while(child){makeUnselectable(child);child=child.nextSibling;}}}
if(!$('#Stage').data('link_areas')){$('#Stage').data('link_areas',true);$('#Stage_links').children().each(function(){$(this).append('<div id="'+$(this).attr('id')+'_area"></div>');$('#'+$(this).attr('id')+'_area').css({'background':'black','opacity':'0','position':'absolute','width':'100%','height':'100%','left':'0px','top':'0px'});});}
$('#Stage').find('.button > div, .checkbox .tickbox, .radio .tickbox, .radio .tickbox div').css({'border-top-color':'#B5B8BA','border-right-color':'#898E91','border-bottom-color':'#5A6165','border-left-color':'#898E91'});$('#Stage .slider').not('.vertical').children().children().css({'width':'100%','border-top-color':'#575E62','border-right-color':'#8C9295','border-bottom-color':'#AEB2B4','border-left-color':'#8C9295'});$('#Stage .slider.vertical').children().children().css({'height':'100%','border-top-color':'#8C9295','border-right-color':'#575E62','border-bottom-color':'#8C9295','border-left-color':'#AEB2B4'});var is_chrome=navigator.userAgent.toLowerCase().indexOf('chrome')>-1;if(is_chrome){$('#Stage .slider').each(function(){var webkit_origin=$(this).find('.handle')[0].style.webkitTransformOrigin;$(this).find('.handle')[0].style.transformOrigin=webkit_origin;});}
$(function(){FastClick.attach(document.body);});if(sym_ie()==9){$('#Stage').find('.button > div, .checkbox .tickbox, .radio .tickbox').css({'background':'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZkZmRmZCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlYmViZWIiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+)'});$('#Stage .radio .tickbox div').css({'background':'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPHJhZGlhbEdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNzUlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMDJkMDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjYmZmZmJmIiBzdG9wLW9wYWNpdHk9IjEiLz4KICA8L3JhZGlhbEdyYWRpZW50PgogIDxyZWN0IHg9Ii01MCIgeT0iLTUwIiB3aWR0aD0iMTAxIiBoZWlnaHQ9IjEwMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+)'});}
$('#Stage').find('*').each(function(){if($(this).css('-webkit-transform')!=''&&$(this).css('-webkit-transform')!='none')
$(this).css('-webkit-transform',$(this).css('-webkit-transform'));});$('#Stage').find('.button, .checkbox, .radio, .slider').each(function(){if(!$(this).hasClass('disabled'))sym_enable(this)});$('#Stage .disabled').each(function(){sym_disable(this)});$('#Stage').find('.checkbox, .radio').each(function(){if(!$(this).hasClass('selected'))sym_deselect(this)});$('#Stage .selected').each(function(){sym_select(this)});$('#Stage .slider').each(function(){if(!$(this).attr('class').match(/min_(\d+)/))var min=0;else var min=$(this).attr('class').match(/min_(\d+)/)[1]*1;if(!$(this).attr('class').match(/max_\d+/))var max=100;else var max=$(this).attr('class').match(/max_(\d+)/)[1]*1;if(!$(this).attr('class').match(/snap_\d+/))var snap=1;else var snap=$(this).attr('class').match(/snap_(\d+)/)[1]*1;if(!$(this).attr('class').match(/val_\d+/))var val=min;else var val=$(this).attr('class').match(/val_(\d+)/)[1]*1;$(this).data('min',min);$(this).data('max',max);$(this).data('snap',snap);$(this).data('default',val);sym_val(this,$(this).data('val')===undefined?val:$(this).data('val'));});if(!$('#Stage').data('slider_events')){$('#Stage').data('slider_events',true);$(document).on('mousedown mousemove touchstart touchmove',function(e){var slider=$('#Stage .slider.active');if(slider.length){e.preventDefault();var min=slider.data('min');var max=slider.data('max');var snap=slider.data('snap');var range,pos;var scale=$('#Stage').attr('style').match(/scale *\(([0-9\.]+)\)/)[1]*1;if(slider.hasClass('vertical')){range=slider.children().height();pos=-slider.children().offset().top;if(e.type=='mousedown'||e.type=='mousemove')pos+=e.pageY;else pos+=e.originalEvent.touches[0].pageY;}else{range=slider.children().width();pos=-slider.children().offset().left;if(e.type=='mousedown'||e.type=='mousemove')pos+=e.pageX;else pos+=e.originalEvent.touches[0].pageX;}
pos=Math.min(Math.max(pos,0),range*scale)/scale;var snap_steps=(max-min)/snap;var snap_interval=range/snap_steps;pos=Math.round(pos/snap_interval)*snap_interval;slider.find('.handle').css(slider.hasClass('vertical')?'top':'left',pos+'px');var val=Math.round(min+pos/range*(max-min));slider.data('val',val);}});$(document).on('mouseup touchend',function(e){$('#Stage .slider.active').removeClass('active');});}
if(!$('#Stage').data('step_events')){$('#Stage').data('step_events',true);$('#Stage_steps').children().find('*').each(function(){if($(this).attr('id')&&$(this).attr('id').match(/_highlight_circle$/))
$(this).css({'outline':'transparent solid 1px'});});$('#Stage_steps_step_buttons').children().each(function(){$(this).append('<div id="'+$(this).attr('id')+'_area"></div>');$('#'+$(this).attr('id')+'_area').css({'background':'black','opacity':'0','position':'absolute','width':'100%','height':'100%','left':'0px','top':'0px'});});var i=1;while(i){if(!$('#Stage_steps_step'+i).length)break;$('#Stage_steps_step'+i).click(function(){sym_step(this.id.match(/\d+/)*1)});i++;}
$('#Stage').data('step_count',i-1);}}
function sym_enable(element){$(element).removeClass('disabled');$(element).css({'opacity':''});$('#'+$(element).attr('id')+'_mask').hide();if($(element).data('css_events'))return;$(element).data('css_events',true);$(element).append('<div id="'+$(element).attr('id')+'_area"></div>');$('#'+$(element).attr('id')+'_area').css({'background':'black','opacity':'0','position':'absolute','width':'100%','height':'100%','left':'0px','top':'0px'});if($(element).hasClass('button')){$(element).on('mouseover touchstart',function(){$(this).children().first().css({'border-top-color':'#009CFE','border-right-color':'#0089DF','border-bottom-color':'#0076C1','border-left-color':'#0089DF'});});$(element).on('mousedown touchstart',function(){$(this).children().first().attr('style',$(this).children().first().attr('style')
+'background:-moz-linear-gradient(top, #e1f3fe 0%, #9cd8fd 100%);'
+'background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#e1f3fe), color-stop(100%,#9cd8fd));'
+'background:-webkit-linear-gradient(top, #e1f3fe 0%,#9cd8fd 100%);'
+'background:-o-linear-gradient(top, #e1f3fe 0%,#9cd8fd 100%);'
+'background:-ms-linear-gradient(top, #e1f3fe 0%,#9cd8fd 100%);'
+'background:linear-gradient(to bottom, #e1f3fe 0%,#9cd8fd 100%);');if(sym_ie()==9)$(this).children().first().css({'background':'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2UxZjNmZSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM5Y2Q4ZmQiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+)'});});$(element).on('mouseout touchend',function(){$(this).children().first().css({'border-top-color':'#B5B8BA','border-right-color':'#898E91','border-bottom-color':'#5A6165','border-left-color':'#898E91'});});$(element).on('mouseout mouseup touchend',function(){$(this).children().first().attr('style',$(this).children().first().attr('style')
+'background:-moz-linear-gradient(top, #fdfdfd 0%, #ebebeb 100%);'
+'background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#fdfdfd), color-stop(100%,#ebebeb));'
+'background:-webkit-linear-gradient(top, #fdfdfd 0%,#ebebeb 100%);'
+'background:-o-linear-gradient(top, #fdfdfd 0%,#ebebeb 100%);'
+'background:-ms-linear-gradient(top, #fdfdfd 0%,#ebebeb 100%);'
+'background:linear-gradient(to bottom, #fdfdfd 0%,#ebebeb 100%);');if(sym_ie()==9)$(this).children().first().css({'background':'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZkZmRmZCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlYmViZWIiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+)'});});}
else if($(element).hasClass('checkbox')||$(element).hasClass('radio')){$('#'+$(element).attr('id')+'_area').on('click',function(){if($(this).parent().hasClass('selected')){if($(this).parent().hasClass('radio'))return;sym_deselect($(this).parent());}
else{sym_select($(this).parent());}});$(element).on('mouseover touchstart',function(){$(this).find('.tickbox').css({'border-top-color':'#009CFE','border-right-color':'#0089DF','border-bottom-color':'#0076C1','border-left-color':'#0089DF'});});$(element).on('mousedown touchstart',function(){$(this).find('.tickbox').attr('style',$(this).find('.tickbox').attr('style')
+'background:-moz-linear-gradient(top, #e1f3fe 0%, #9cd8fd 100%);'
+'background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#e1f3fe), color-stop(100%,#9cd8fd));'
+'background:-webkit-linear-gradient(top, #e1f3fe 0%,#9cd8fd 100%);'
+'background:-o-linear-gradient(top, #e1f3fe 0%,#9cd8fd 100%);'
+'background:-ms-linear-gradient(top, #e1f3fe 0%,#9cd8fd 100%);'
+'background:linear-gradient(to bottom, #e1f3fe 0%,#9cd8fd 100%);');if(sym_ie()==9)$(this).find('.tickbox').css({'background':'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2UxZjNmZSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM5Y2Q4ZmQiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+)'});});$(element).on('mouseout touchend',function(){$(this).find('.tickbox').css({'border-top-color':'#B5B8BA','border-right-color':'#898E91','border-bottom-color':'#5A6165','border-left-color':'#898E91'});});$(element).on('mouseout mouseup touchend',function(){$(this).find('.tickbox').attr('style',$(this).find('.tickbox').attr('style')
+'background:-moz-linear-gradient(top, #fdfdfd 0%, #ebebeb 100%);'
+'background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#fdfdfd), color-stop(100%,#ebebeb));'
+'background:-webkit-linear-gradient(top, #fdfdfd 0%,#ebebeb 100%);'
+'background:-o-linear-gradient(top, #fdfdfd 0%,#ebebeb 100%);'
+'background:-ms-linear-gradient(top, #fdfdfd 0%,#ebebeb 100%);'
+'background:linear-gradient(to bottom, #fdfdfd 0%,#ebebeb 100%);');if(sym_ie()==9)$(this).find('.tickbox').css({'background':'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZkZmRmZCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlYmViZWIiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+)'});});if($(element).hasClass('radio')){$(element).on('mouseover touchstart',function(){$(this).find('.tickbox div').css({'opacity':'0.8','border-top-color':'#009CFE','border-right-color':'#0089DF','border-bottom-color':'#0076C1','border-left-color':'#0089DF'});});$(element).on('mouseout touchend',function(){$(this).find('.tickbox div').css({'opacity':'','border-top-color':'#B5B8BA','border-right-color':'#898E91','border-bottom-color':'#5A6165','border-left-color':'#898E91'});});}}
else if($(element).hasClass('slider')){$(element).on('mouseover mouseup',function(){$(this).find('.handle').css({'background-position':'0% 50%'});});$(element).on('mousedown touchstart',function(){$(this).find('.handle').css({'background-position':'0% 100%'});$(this).addClass('active');});$(element).on('mouseout touchend',function(){$(this).find('.handle').css({'background-position':'0% 0%'});});}}
function sym_disable(element){$(element).addClass('disabled');$(element).css({'opacity':'0.4'});$('#'+$(element).attr('id')+'_mask').show();if(!$('#'+$(element).attr('id')+'_mask').length){$(element).after('<div id="'+$(element).attr('id')+'_mask"></div>');$('#'+$(element).attr('id')+'_mask').css({'background':'black','opacity':'0','position':$(element).css('position'),'width':$(element).css('width'),'height':$(element).css('height'),'left':$(element)[0].style.left,'top':$(element)[0].style.top,'right':$(element)[0].style.right,'bottom':$(element)[0].style.bottom});}}
function sym_select(element){$(element).addClass('selected');$(element).find('.tickbox div').show();if($(element).hasClass('radio')){$(element).data('selecting',true);var group=$(element).attr('class').match(/group_[^ ]+/)[0];$('#Stage .'+group).each(function(){if($(this).data('selecting'))$(this).data('selecting',false);else sym_deselect(this);});}}
function sym_deselect(element){$(element).removeClass('selected');$(element).find('.tickbox div').hide();}
function sym_val(element,val){var min=$(element).data('min');var max=$(element).data('max');var range=$(element).hasClass('vertical')?$(element).children().height():$(element).children().width();var pos=(val-min)/(max-min)*range;$(element).find('.handle').css($(element).hasClass('vertical')?'top':'left',pos+'px');$(element).data('val',val);}
function sym_step(step){step*=1;$('#Stage').data('step',step);var sym=AdobeEdge.getComposition(compId).getSymbols('steps')[0];sym.stop(step+'');sym.$('step_buttons').children().children().css({'border-color':'#999999'});sym.$('step'+step).children().css({'border-color':'#1F7258'});sym.$('step_buttons').children().children().children().css({'color':'#999999'});sym.$('step'+step).children().children().css({'color':'#1F7258'});step_functions(step);}
function sym_ie(){var version=false;if(navigator.appVersion.indexOf("MSIE")!=-1)
version=parseFloat(navigator.appVersion.split("MSIE")[1]);return version;}

//Edge symbol: 'stage'
(function(symbolName){Symbol.bindElementAction(compId,symbolName,"document","compositionReady",function(sym,e){sym_features();yepnope({load:"normalize.css"});setup_mode_event(null);show_labels_event(null);var text_ids=['source','splitter1','splitter2','mirror1','mirror2','shifter','filter1','filter2','detector1','detector2'];for(var t in text_ids){$('#Stage_setup_'+text_ids[t]).click(popup_event);$('#Stage_setup_'+text_ids[t]).mouseover(popup_event);$('#Stage_setup_'+text_ids[t]).mouseout(popup_event);}
function popup_event(e){var text_id=e.currentTarget.id.replace('setup_','text_');if(!$('#'+text_id).length)text_id=text_id.replace(/[12]$/,'s');var fixed_id=$('.fixed_text').attr('id');if(e.type=='click'){$('.fixed_text').hide().removeClass('fixed_text');if(fixed_id!=text_id)$('#'+text_id).show().addClass('fixed_text');}
else{if(e.type=='mouseover'||fixed_id!=text_id)e.type=='mouseover'?$('#'+text_id).show():$('#'+text_id).hide();if(e.type=='mouseover'&&fixed_id&&fixed_id!=text_id){$('#'+fixed_id).hide();fixed_id=false;}}}
$(document).on('mousedown mousemove touchstart touchmove',function(e){var slider=sym.$('phase_slider');if(slider.hasClass('active')&&!slider.data('timeout')){slider.data('timeout',setTimeout(function(){slider.data('timeout',false);if(slider.data('timeout_val')===slider.data('val'))return;slider.data('timeout_val',slider.data('val'));phase_shift_event(null);},20));}});});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_show_probabilities_checkbox}","click",function(sym,e){show_labels_event(e);});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_show_state_checkbox}","click",function(sym,e){show_labels_event(e);});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_show_introduciton_radio}","click",function(sym,e){sym.stop('introduction');sym_features();$('.fixed_text').hide().removeClass('fixed_text');$('#Stage_send_continuous_button_label').text("Continuous Fire");sym_enable($('#Stage_send_single_button'));});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_show_controls_radio}","click",function(sym,e){sym.stop('simulation');sym_features();show_labels(save.show_probabilities,save.show_state,save.show_matrix);setup_mode(save.insert_filters,save.insert_shifter);phase_shift(save.phase_value);});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_show_matrix_checkbox}","click",function(sym,e){show_labels_event(e);});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_send_single_button}","click",function(sym,e){send_single_photon(e);});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_send_continuous_button}","click",function(sym,e){send_continuous_photons(e);});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_tab_simulation}","click",function(sym,e){sym.stop('simulation');sym_features();$('#Stage').data('step',false);clearTimeout(AdobeEdge.step_animation);show_labels(save.show_probabilities,save.show_state,save.show_matrix);setup_mode(save.insert_filters,save.insert_shifter);phase_shift(save.phase_value);sym_select(sym.$('show_controls_radio'));});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_tab_explanation}","click",function(sym,e){sym.stop('explanation');sym_features();sym_step(1);$('#Stage_send_continuous_button_label').text("Continuous Fire");sym_enable($('#Stage_send_single_button'));});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_insert_shifter_button}","click",function(sym,e){setup_mode_event(e);});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_insert_filters_button}","click",function(sym,e){setup_mode_event(e);});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_link_iop}","click",function(sym,e){window.open('http://www.iop.org','_blank');});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_link_quantumphysics}","click",function(sym,e){window.open('http://quantumphysics.iop.org','_blank');});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_link_st_andrews}","click",function(sym,e){window.open('http://www.st-andrews.ac.uk/physics/quvis/','_blank');});
//Edge binding end
})("stage");
//Edge symbol end:'stage'

//=========================================================

//Edge symbol: 'checkbox_tickbox'
(function(symbolName){})("checkbox_tickbox");
//Edge symbol end:'checkbox_tickbox'

//=========================================================

//Edge symbol: 'radio_tickbox'
(function(symbolName){})("radio_tickbox");
//Edge symbol end:'radio_tickbox'

//=========================================================

//Edge symbol: 'exploration'
(function(symbolName){})("steps");
//Edge symbol end:'steps'

//=========================================================

//Edge symbol: 'highlight'
(function(symbolName){Symbol.bindTimelineAction(compId,symbolName,"Default Timeline","complete",function(sym,e){sym.play(0);});
//Edge binding end
})("highlight");
//Edge symbol end:'highlight'

//=========================================================

//Edge symbol: 'photon_path2_1'
(function(symbolName){Symbol.bindTimelineAction(compId,symbolName,"Default Timeline","complete",function(sym,e){sym.stop(0);var stage=sym.getComposition().getStage();stage.getSymbol('detector_flash_up').stop(0);stage.getSymbol('detector_flash_down').stop(0);var prob_up=$('#Stage_prob_up').text().replace('%','')/100;var prob_down=1-prob_up;if(Math.random()<prob_up){stage.getSymbol('detector_flash_up').play();}else{stage.getSymbol('detector_flash_down').play();}});
//Edge binding end
Symbol.bindTimelineAction(compId,symbolName,"Default Timeline","play",function(sym,e){var prob_up=$('#Stage_prob_up').text().replace('%','')/100;var prob_down=1-prob_up;var alpha_up=prob_up;var alpha_down=prob_down;if(alpha_up>0)alpha_up=Math.max(alpha_up,0.1);if(alpha_down>0)alpha_down=Math.max(alpha_down,0.1);sym.$('photon_final1').css('opacity',alpha_up);sym.$('photon_final1').css('filter','alpha(opacity='+(alpha_up*100)+')');sym.$('photon_final2').css('opacity',alpha_down);sym.$('photon_final2').css('filter','alpha(opacity='+(alpha_down*100)+')');var wave1='0001';var wave2='0001';if(alpha_up<1)var wave1=('000'+Math.round((1-alpha_up)*100)).slice(-4);if(alpha_down<1)var wave2=('000'+Math.round((1-alpha_down)*100)).slice(-4);sym.$('photon_final1_wave').attr('style',sym.$('photon_final1_wave').attr('style').replace(/photon_wave\d+\.png/,'photon_wave'+wave1+'.png'));sym.$('photon_final2_wave').attr('style',sym.$('photon_final2_wave').attr('style').replace(/photon_wave\d+\.png/,'photon_wave'+wave2+'.png'));var alpha_entangle=prob_up==1||prob_up==0?0:1;sym.$('entangle_final').css('opacity',alpha_entangle);sym.$('entangle_final').css('filter','alpha(opacity='+(alpha_entangle*100)+')');});
//Edge binding end
})("photon_path");
//Edge symbol end:'photon_path'

//=========================================================

//Edge symbol: 'detector_flash'
(function(symbolName){Symbol.bindTimelineAction(compId,symbolName,"Default Timeline","complete",function(sym,e){var send_photons=$('#Stage_send_continuous_button_label').text()!="Continuous Fire";if(send_photons)send_single_photon(e);});
//Edge binding end
})("detector_flash");
//Edge symbol end:'detector_flash'

//=========================================================

//Edge symbol: 'step1_animation'
(function(symbolName){Symbol.bindTimelineAction(compId,symbolName,"Default Timeline","complete",function(sym,e){sym.play(0);});
//Edge binding end
})("step1_animation");
//Edge symbol end:'step1_animation'
})(jQuery,AdobeEdge,"EDGE-19890435");