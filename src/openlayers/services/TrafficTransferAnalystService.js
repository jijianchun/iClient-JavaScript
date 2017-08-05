﻿import Util from '../core/Util';
import ServiceBase from './ServiceBase';
import StopQueryService from '../../common/iServer/StopQueryService';
import TransferPathService from'../../common/iServer/TransferPathService';
import TransferSolutionService from '../../common/iServer/TransferSolutionService';
/**
 * @class ol.supermap.TrafficTransferAnalystService
 * @constructs  ol.supermap.TrafficTransferAnalystService
 * @classdesc
 * 交通换乘分析服务类
 * @example 用法
 *      new ol.supermap.TrafficTransferAnalystService(url)
 *      .queryStop(params,function(result){
 *           //doSomething
 *      })
 * @api
 */
export default class TrafficTransferAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @method ol.supermap.TrafficTransferAnalystService.prototype.queryStop
     * @description 站点查询服务
     * @param params {StopQueryParameters}
     * @param callback
     */
    queryStop(params, callback) {
        var me = this;
        var stopQueryService = new StopQueryService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        stopQueryService.processAsync(params);
        return me;
    }

    /**
     * @method ol.supermap.TrafficTransferAnalystService.prototype.analysisTransferPath
     * @description 交通换乘线路查询服务
     * @param params {TransferPathParameters}
     * @param callback
     */
    analysisTransferPath(params, callback) {
        var me = this;
        var transferPathService = new TransferPathService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        transferPathService.processAsync(me._processParams(params));
        return me;
    }

    /**
     * @method ol.supermap.TrafficTransferAnalystService.prototype.analysisTransferSolution
     * @description 交通换乘方案查询服务
     * @param params {TransferSolutionParameters}
     * @param callback
     */
    analysisTransferSolution(params, callback) {
        var me = this;
        var transferSolutionService = new TransferSolutionService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        transferSolutionService.processAsync(me._processParams(params));
        return me;
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        if (params.transferLines && !Util.isArray(params.transferLines)) {
            params.transferLines = [params.transferLines];
        }
        if (params.points && Util.isArray(params.points)) {
            params.points.map(function (point, key) {
                params.points[key] = (point instanceof ol.geom.Point) ? {
                    x: point.getCoordinates()[0],
                    y: point.getCoordinates()[1]
                } : point;
            });
        }
        return params;
    }

}
ol.supermap.TrafficTransferAnalystService = TrafficTransferAnalystService;