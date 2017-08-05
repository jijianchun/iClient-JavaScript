﻿import SuperMap from '../SuperMap';
import GetFeaturesServiceBase from './GetFeaturesServiceBase';
import GetFeaturesByGeometryParameters from './GetFeaturesByGeometryParameters';

/**
 * @class SuperMap.GetFeaturesByGeometryService
 * @constructs SuperMap.GetFeaturesByGeometryService
 * @classdesc
 * 数据集几何查询服务类
 * 查询与指定几何对象符合一定空间关系的矢量要素。
 * @extends {SuperMap.GetFeaturesServiceBase}
 * @api
 * @example 例如：
 * (start code)
 * var myService = new SuperMap.GetFeaturesByGeometryService(url, {
     *     eventListeners: {
     *           "processCompleted": getFeatureCompleted,
     *           "processFailed": getFeatureError
     *           }
     * });
 * function getFeatureCompleted(object){//todo};
 * function getFeatureError(object){//todo}
 * (end)
 *
 */
export default  class GetFeaturesByGeometryService extends GetFeaturesServiceBase {


    /**
     * @method SuperMap.GetFeaturesByGeometryService.initialize
     * @description 数据集几何查询服务类构造函数。
     * @param url - {String} 数据查询结果资源地址。请求数据服务中数据集查询服务，:</br>
     * URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data；:</br>
     * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data"
     * @param options - {Object} 参数。
     *
     * Allowed options properties:</br>
     * eventListeners - {Object} 需要被注册的监听器对象。</br>

     */
    constructor(url, options) {
        super(url, options);
    }

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
    }

    /**
     * @method SuperMap.GetFeaturesByGeometryService.getJsonParameters
     * @param params - {SuperMap.GetFeaturesByGeometryParameters}
     *
     * @description 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（ID, SQL, Buffer, Geometry等）。
     * @return {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters(params) {
        return GetFeaturesByGeometryParameters.toJsonParameters(params);
    }

    CLASS_NAME = "SuperMap.GetFeaturesByGeometryService"
}

SuperMap.GetFeaturesByGeometryService = GetFeaturesByGeometryService;