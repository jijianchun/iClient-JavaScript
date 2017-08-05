﻿import SuperMap from '../SuperMap';import DatasourceConnectionInfo from './DatasourceConnectionInfo';/** * @class SuperMap.LinkItem * @constructs SuperMap.LinkItem * @classdesc * 关联信息类。 * 该类用于矢量数据集与外部表的关联。 外部表是另一个数据集（其中纯属性数据集中没有空间几何信息）中的 DBMS 表,矢量数据集与外部表可以属于不同的数据源，但数据源类型目前只支持SQL Server和Oracle类型。使用LinkItem时，空间数据和属性数据必须满足关联条件，即主空间数据集与外部属性表之间存在关联字段。SuperMap.LinkItem 只支持左连接，UDB、PostgreSQL 和 DB2 数据源不支持 SuperMap.LinkItem;另外，用于建立关联关系的两个表可以不在同一个数据源下。 * (注意： * 1. 使用 SuperMap.LinkItem 的约束条件为：空间数据和属性数据必须有关联条件，即主空间数据集与外部属性表之间存在关联字段； * 2. 使用外关联表制作专题图时，所关联的字段必须设置表名，例如，如果所关联的字段为BaseMap_R数据集的SmID，就要写成BaseMap_R.SMID。) * @api * @example 下面以SQL查询说明linkitem的使用方法： * (start code) *  function queryBySQL() {     *      // 设置关联的外部数据库信息,alias表示数据库别名     *      var dc = new SuperMap.DatasourceConnectionInfo({     *          dataBase: "RelQuery",     *          server: "192.168.168.39",     *          user: "sa",     *          password: "map",     *          driver: "SQL Server",     *          connect: true,     *          OpenLinkTable: false,     *          alias: "RelQuery",     *          engineType: EngineType.SQLPLUS,     *          readOnly: false,     *          exclusive: false     *      });     *     // 设置关联信息     *      var linkItem = new SuperMap.LinkItem({     *          datasourceConnectionInfo: dc,     *          foreignKeys: ["name"],     *          foreignTable: "Pop_2011",     *          linkFields: ["SmID as Pid","pop"],     *          name: "link",     *          primatryKeys: ["name"],     *      });     *      // 设置查询参数，在查询参数中添加linkItem关联条件信息     *      var queryParam, queryBySQLParams, queryBySQLService;     *      queryParam = new SuperMap.FilterParameter({     *          name: "Province@RelQuery",     *          fields: ["SmID","name"],     *          attributeFilter: "SmID<7",     *          linkItems: [linkItem]     *       }),     *      queryBySQLParams = new SuperMap.QueryBySQLParameters({     *           queryParams: [queryParam]     *              }),     *      queryBySQLService = new SuperMap.QueryBySQLService(url, {     *          eventListeners: {     *              "processCompleted": processCompleted,     *              "processFailed": processFailed     *              }     *      });     *      queryBySQLService.processAsync(queryBySQLParams);     *  } *  function processCompleted(queryEventArgs) {//todo} *  function processFailed(e) {//todo} * (end) * */export default class LinkItem {    /**     * APIProperty: datasourceConnectionInfo     * {SuperMap.DatasourceConnectionInfo} 关联的外部数据源信息 。     */    datasourceConnectionInfo = null;    /**     * APIProperty: foreignKeys     * {Array(String)} 主空间数据集的外键。     */    foreignKeys = null;    /**     * APIProperty: foreignTable     * {String} 关联的外部属性表的名称，目前仅支持 Supermap 管理的表，即另一个矢量数据集所对应的 DBMS 表。     */    foreignTable = null;    /**     * APIProperty: linkFields     * {Array(String)} 欲保留的外部属性表的字段。如果不设置字段或者设置的字段在外部属性表中不存在的话则不返     * 回任何外部属性表的属性信息。如果欲保留的外部表字段与主表字段存在同名，则还需要指定一个不存在字段名作为外部表的字段别名。     */    linkFields = null;    /**     * APIProperty: linkFilter     * {String} 与外部属性表的连接条件。     */    linkFilter = null;    /**     * APIProperty: name     * {String} 此关联信息对象的名称。     */    name = null;    /**     * APIProperty: primaryKeys     * {Array(String)} 需要关联的外部属性表的主键。     */    primaryKeys = null;    /**     * @method SuperMap.LinkItem.initialize     * @description 关联信息类构造函数。     *     * 设置将TableB关联到TableA的关联信息，即建立LinkItem类并设置其属性，TableA与TableB是通过主表（TableA）的外键（LinkItem类的 ForeignKey 属性）和副表（TableB）的主键（LinkItem类的 PrimaryKey 属性）实现关联的，当执行TableA的查询操作时，系统将根据关联信息中的过滤条件及查询条件，分别查询TableA与TableB中满足条件的内容，TableA的查询结果与TableB的查询结果分别作独立的两个结果表保存在内存中，当需要获取结果时，SuperMap将对两个结果进行拼接并返回，因此，进行关联查询时，查询参数中的返回字段一定要有关联条件中的外键，否则无法根据外键的值获取副表中的关联字段值，副表中的字段值将返回 null。在应用层看来，连接和关联操作很相似。     *     * @param options - {Object} 参数。     * Allowed options properties:</br>     * datasourceConnectionInfo - {SuperMap.DatasourceConnectionInfo} 关联的外部数据源信息。</br>     * foreignKeys - {Array(String)} 主空间数据集的外键。</br>     * foreignTable - {String} 关联的外部属性表的名称。</br>     * linkFields - {Array(String)} 欲保留的外部属性表的字段。</br>     * linkFilter - {String} 与外部属性表的连接条件。</br>     * name - {String} 此关联信息对象的名称。</br>     * primaryKeys - {Array(String)} 需要关联的外部属性表的主键。</br>     */    constructor(options) {        if (options) {            SuperMap.Util.extend(this, options);        }    }    /*     * APIMethod: destroy     * 释放资源，将引用资源的属性置空。     */    destroy() {        var me = this;        if (me.datasourceConnectionInfo) {            me.datasourceConnectionInfo.destroy();            me.datasourceConnectionInfo = null;        }        me.foreignKeys = null;        me.foreignTable = null;        me.linkFields = null;        me.linkFilter = null;        me.name = null;        me.primaryKeys = null;    }    CLASS_NAME = "SuperMap.LinkItem"}SuperMap.LinkItem = LinkItem;