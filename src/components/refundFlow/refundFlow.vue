<template>
<div class="pageBody">
    <div class="positionBar"><span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 > 汇总</div>
    <div class="titleSlot">搜索</div>
    <div class="searchBar">
        <el-form :inline="true" :model="serchName" class="demo-form-inline">
            <el-form-item label="职工姓名">
                <el-input placeholder="职工姓名" v-model.trim="serchName" clearable size="medium"> </el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input placeholder="手机号" v-model.trim="serchMobile" clearable size="medium"> </el-input>
            </el-form-item>
            <el-form-item label="退款流水">
                <el-input placeholder="退款流水" v-model.trim="serchRefundSn" clearable size="medium"> </el-input>
            </el-form-item>
            <el-form-item label="退款日期">
                <template>
                    <el-date-picker
                    v-model="startDate"
                    type="date"
                    size="medium"
                    :default-value="endDate"
                    :picker-options="pickerOptionsStar"
                    placeholder="选择开始日期" >
                </el-date-picker>
                <el-date-picker
                    v-model="endDate"
                    type="date"
                    size="medium"
                    :default-value="startDate"
                    placeholder="选择结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </template>
                <!-- <el-date-picker v-model="date" type="daterange" align="center" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="dateChangeFun()" size="small">
                </el-date-picker> -->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" class="typeSelector" @click="firstQuery()">查询</el-button>
            </el-form-item>
        </el-form>

    </div>
    <div class="dataBar">
        <el-table lazy ref="table1" :data="tableData2" border size="small" v-loading="loading1" highlight-current-row style="width: 100%">
            <el-table-column prop="refundTime" label="退款时间" min-width="120">
                <template slot-scope="scope">{{ scope.row.refundTime | formatDate("YYYY-MM-DD HH:mm:ss") }}</template>
            </el-table-column>
            <el-table-column prop="name" label="职工名字" min-width="100">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="100">
            </el-table-column>
            <el-table-column prop="sn" label="退款流水号" min-width="150">
            </el-table-column>
            <el-table-column prop="refundAmount" label="退款金额" min-width="100">
            </el-table-column>
            <el-table-column prop="refundState" label="退款状态" min-width="100">
                <template slot-scope="scope">{{ reFundstateOptions[scope.row.refundState] }}</template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="queryByRefundSn(scope.row)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
    
    <el-dialog title="退款详情" :visible.sync="dialogFormVisible" :modal="false" width="55%">
        <el-table :data="detailData" v-loading="loading2" style="width: 100%;margin-bottom: 20px; font-size:0.9em;" border stripe>
            <el-table-column
                prop="refundSn"
                label="退款流水号">
                </el-table-column>
                <el-table-column
                prop="refundOrderId"
                label="退款订单号">
                </el-table-column>
                <el-table-column
                prop="refundAmount"
                label="退款金额">
                    <template slot-scope="scope">{{ '-'+scope.row.refundAmount }}</template>
                </el-table-column>
                <el-table-column
                prop="refundState"
                label="退款状态">
                    <template slot-scope="scope">{{ reFundstateOptions[scope.row.refundState] }}</template>
                </el-table-column>
                <el-table-column
                prop="srcAmount"
                label="原交易金额">
                </el-table-column>
                <el-table-column
                prop="srcOutTradeNo"
                label="原交易流水号">
                </el-table-column>
                <el-table-column
                prop="srcPayTime"
                label="原交易时间">
                </el-table-column>
                <el-table-column
                prop="refundResult"
                label="退款结果"
                width="90">
                <template slot-scope="scope"><span class="refundResultClass" :title="scope.row.refundResult">{{scope.row.refundResult}}</span></template>
                </el-table-column>
            </el-table>
    </el-dialog>
</div>
</template>

<script>
import {
    queryRefundOrderBypager,queryByRefundSn
} from "@/api/refundOrder/refundOrder.js";
export default {
    name: "staffInfo",
    data() {
        return {
            loading1: false,
            loading2: false,
            dialogFormVisible: false,
            detailData:[],
            form: {
                sn: '',
                name: '',
                mobile: '',
                state: '',
                wxOpenId: '',
                wxNickname: '',
                workerType: ''
            },
            serchRefundSn: '',
            startDate: "",
            endDate: "",
            serchName: '',
            serchMobile: '',
            date: null, //new Date() - 3600 * 1000 * 24 * 30, new Date()
            type: "",
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            tableData2: [],
            dialogFormVisible: false,
            reFundstateOptions: {
                '00': '成功',
                '01': '待退款',
                '02': '退款中',
                '99': '退款失败'
            },
            pickerOptionsStar: {
                disabledDate: time => {
                    var newdate = new Date();
                    var endDate = new Date(this.endDate);
                    if (this.endDate) {
                        return time.getTime() > endDate.getTime(); //不可选结束日期以后
                    }else{
                        return time.getTime() > newdate.getTime(); //不可选当前日期以后
                    }
                }
            },
            pickerOptions: {
                disabledDate: time => {
                var newdate = new Date();
                var date = new Date(this.startDate);
                return (
                    time.getTime() > newdate.getTime()||
                    time.getTime() < date.getTime()
                    ); //当月可选择时间为起始时间到当天
                }
            }
        }
    },
    mounted() {
        this.firstQuery();
    },
    methods: {
        queryByRefundSn(row){
            this.dialogFormVisible = true;
            this.loading2 = false;
            var data = {
                refundSn: row.sn
            }
            queryByRefundSn(data).then((result) => {
                this.loading2 = false;
                if (result.status == "success") {
                    this.detailData = result.list;
                    /* var tableData = [];
                    this.tableData2.forEach(element => {
                        tableData.push(element);
                    });
                    this.tableData2 = tableData;
                    setTimeout(() => {
                    this.$refs.table1.toggleRowExpansion(row,true);
                    }, 100); */
                }else{
                    this.$message.error(result.msg);
                }
            }).catch((err) => {
                this.loading2 = false;
                this.$message.error("系统错误");
            });
        },
        /* dateIsNullFun() {
            if (this.date != null) {
                this.startDate = this.$moment(this.date[0]).format("YYYYMMDD");
                this.endDate = this.$moment(this.date[1]).format("YYYYMMDD");
            } else {
                this.startDate = null;
                this.endDate = null;
            }
        }, */
        /* dateChangeFun() {
            if (this.date == null) {
                this.startDate = null;
                this.endDate = null;
            }
        }, */
        firstQuery() {
            this.total = 0;
            var data = {
                starTime: this.startDate?this.$moment(this.startDate).format("YYYYMMDD"):"",
                endTime: this.endDate?this.$moment(this.endDate).format("YYYYMMDD"):"",
                name: this.serchName,
                mobile: this.serchMobile,
                refundSn: this.serchRefundSn,
                pageSize: 10,
                pageNumber: 1
            }
            this.queryWorkerList(data);
        },
        nextQuery() {
            var data = {
                starTime: this.startDate?this.$moment(this.startDate).format("YYYYMMDD"):"",
                endTime: this.endDate?this.$moment(this.endDate).format("YYYYMMDD"):"",
                name: this.serchName,
                mobile: this.serchMobile,
                refundSn: this.serchRefundSn,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }
            this.queryWorkerList(data);
        },
        queryWorkerList(data) {
            this.loading1 = true;
            queryRefundOrderBypager(data).then(response => {
                this.loading1 = false;
                if (response.status == 'success') {
                    this.tableData2 = response.list;
                    this.total = response.data.pageInfo.total;
                } else if (response.status == 'error') {
                    this.$message.error('查询失败');
                } else {
                    this.$message.error('查询异常');
                }
            }).catch(error=>{
                this.loading1 = false;
                this.$message.error('系统异常');
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.nextQuery();
        },
        handleCurrentChange(val) {
            this.pageNumber = val;
            this.nextQuery();
        }
    }
};
</script>

<style lang="scss" scoped>
.pageBody {
    font: 14px Helvetica Neue, Helvetica, PingFang SC, \5fae\8f6f\96c5\9ed1,
        Tahoma, Arial, sans-serif;
}

.positionBar {
    margin-top: 3px;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
    background-color: #fff;
}

.titleSlot {
    margin: 10px 20px;
}

.searchBar {
    margin: 0 20px;
    background-color: #fff;
    padding: 15px 10px;
}

.typeSelector {
    margin-left: 35px;
}

.dataBar {
    margin: 20px 20px 0 20px;
    background-color: #fff;
    padding: 15px 10px;
}

.el-table thead tr th {
    /* 表头颜色 */
    background-color: rgb(168, 168, 168);
}

.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
.el-table__expand-icon .el-icon.el-icon-arrow-right{
    display: none!important;
}
.refundResultClass{
    text-overflow: ellipsis;
    overflow:hidden;
    white-space:nowrap;
    width: 100%;
}
</style>
