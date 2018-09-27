import * as angular from 'angular';
import "../kylo-utils/LazyLoadUtil";
const CodeMirror = require('../../node_modules/codemirror/lib/codemirror');
import "../../node_modules/angular-ui-codemirror/ui-codemirror";
import {moduleName} from "./module-name";

class ModuleFactory  {
    module: ng.IModule;
    constructor () {
       (<any>window).CodeMirror = CodeMirror;
        this.module = angular.module(moduleName,['ui.codemirror']);
        this.module.run(['$ocLazyLoad', this.runFn.bind(this)]); 
    }
    runFn($ocLazyLoad: oc.ILazyLoad){
         $ocLazyLoad.load({name:'kylo',files:[
                                             // 'node_modules/codemirror/lib/codemirror.css',
                                             // 'node_modules/codemirror/addon/hint/show-hint.css',
                                             // 'node_modules/codemirror/addon/dialog/dialog.css',
                                             // 'node_modules/codemirror/addon/tern/tern.css',
                                             'codemirror/mode/pig/pig',
                                             'codemirror/mode/properties/properties',
                                             'codemirror/mode/python/python',
                                             'codemirror/mode/velocity/velocity',
                                             'codemirror/mode/xml/xml',
                                             'codemirror/mode/shell/shell',
                                             'codemirror/mode/javascript/javascript',
                                             'codemirror/mode/sql/sql',
                                             'codemirror/addon/tern/tern',
                                             'codemirror/addon/hint/show-hint',
                                             'codemirror/addon/hint/sql-hint',
                                             'codemirror/addon/hint/xml-hint',
                                             'codemirror/mode/groovy/groovy',
                                             'codemirror/addon/dialog/dialog'
        ]})
    }
} 
const module = new ModuleFactory();
export default module;

