<template>
<div class="pageBody">
    <div class="positionBar"><span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 > 订单产生</div>
    <div class="titleSlot">搜索</div>
    <div class="searchBar">

        <el-form :inline="true" :model="serchName" class="demo-form-inline">
            <el-form-item label="用户33名">
                <el-input placeholder="职工姓名" v-model.trim="serchName" clearable size="medium"> </el-input>
            </el-form-item>
              <el-form-item label="商品数量">
                <el-input placeholder="" v-model.trim="serchMobile" clearable size="medium"> </el-input>
            </el-form-item>
            <el-form-item label="支付流水">
                <el-input placeholder="支付流水" v-model.trim="serchPaySn" clearable size="medium"> </el-input>
            </el-form-item>
            <el-form-item label="支付日期">
                <template>
                    <el-date-picker
                        v-model="startDate"
                        :default-value="endDate"
                        type="date"
                        size="medium"
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
                <!-- <el-date-picker v-model="date" type="daterange" @change="dateChangeFun()" align="center" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small">
                </el-date-picker> -->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" class="typeSelector" @click="firstQuery()">查询</el-button>
                <el-button type="primary" size="small" class="typeSelector" @click="firstQuery()">下载</el-button>
            </el-form-item>
        </el-form>

    </div>
    <div class="dataBar">
        <el-table :data="tableData2" v-loading="loading" stripe border size="small" highlight-current-row style="width: 100%">
            <el-table-column prop="payTime" label="支付时间" min-width="120">
            </el-table-column>
            <el-table-column prop="name" label="职工名字" min-width="120">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="120">
            </el-table-column>
            <el-table-column prop="state" label="支付状态" min-width="90">
                <template slot-scope="scope">{{ payStateOptions[scope.row.state] }}</template>
            </el-table-column>
            <el-table-column prop="paySn" label="支付流水号" min-width="120">
            </el-table-column>
            <el-table-column prop="payAmount" label="支付金额" min-width="120">
            </el-table-column>
            <el-table-column prop="payType" label="支付方式" min-width="120">
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</div>
</template>

<script>
import {
    queryPaymentFBypager
} from "@/api/payment/payment.js";
import moment from 'moment';
export default {
    name: "staffInfo",
    data() {
        return {
            form: {
                sn: '',
                name: '',
                mobile: '',
                state: '',
                wxOpenId: '',
                wxNickname: '',
                workerType: ''
            },
             payStateOptions: {
                '00': '成功',
                '01': '待支付',
                '99': '支付失败'
            },
            startDate: "",
            endDate: "",
            serchName: '',
            serchMobile:'',
            serchPaySn: '',
            // date: null, //[new Date()- 3600 * 1000 * 24 *30, new Date()]
            type: "",
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            tableData2: [],
            dialogFormVisible: false,
            loading: false,
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
        firstQuery() {
            this.total = 0;
            var data = {
                starTime: this.startDate?this.$moment(this.startDate).format("YYYY-MM-DD"):"",
                endTime: this.endDate?this.$moment(this.endDate).format("YYYY-MM-DD"):"",
                name: this.serchName,
                mobile:this.serchMobile,
                paySn: this.serchPaySn,
                pageSize: 10,
                pageNumber: 1
            }
            this.queryWorkerList(data);
        },
        nextQuery() {
            var data = {
                starTime: this.startDate?this.$moment(this.startDate).format("YYYY-MM-DD"):"",
                endTime: this.endDate?this.$moment(this.endDate).format("YYYY-MM-DD"):"",
                name: this.serchName,
                mobile:this.serchMobile,
                paySn: this.serchPaySn,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }
            this.queryWorkerList(data);
        },
        queryWorkerList(data) {
            this.loading = true;
            queryPaymentFBypager(data).then(response => {
                this.loading = false;
                if (response.status == 'success') {
                    this.tableData2 = response.list;
                    this.total = response.data.pageInfo.total;
                } else if (response.status == 'error') {
                    this.$message.error('查询失败');
                } else {
                    this.$message.error('查询异常');
                }
            }).catch(error=>{
                this.loading = false;
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.nextQuery();
        },
        handleCurrentChange(val) {
            this.pageNumber = val;
            this.nextQuery();
        },
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
</style>
