<template>
<div class="pageBody">
    <div class="positionBar"><span class="fontFamily sdh-icon-dingwei"></span>&nbsp;&nbsp;当前位置 > 订单信息</div>
    <div class="titleSlot">搜索</div>
    <div class="searchBar">
        <el-form :inline="true" :model="serchName" class="demo-form-inline">
            <el-form-item label="职工姓名">
                <el-input placeholder="职工姓名" v-model.trim="serchName" clearable size="medium"> </el-input>
            </el-form-item>
            <el-form-item label="职工类型">
                <el-select v-model="serchWorkerType" clearable size="medium">
                    <el-option v-for="(item,key) in workerTypeOptions" :key="key" clearable :label="item" :value="key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" class="typeSelector" @click="firstQuery()">查询</el-button>
                <el-button type="primary" size="small" class="typeSelector" @click="addFunLoad()">新增</el-button>
                 <el-button type="primary" size="small" class="typeSelector" @click="modelFun()">模板下载</el-button>
            </el-form-item>
            <el-form-item>
                <el-upload class="upload-demo" :action="batchUrl" :show-file-list='false' :on-error="errorFun" :on-success="successFun"  :multiple='false'>
                    <el-button size="small" type="primary">批量新增</el-button>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
    <div class="dataBar">
        <el-table :data="tableData2" v-loading="loading" stripe border size="small" highlight-current-row style="width: 100%">
            <el-table-column prop="name" label="职工名字">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号">
            </el-table-column>
            <el-table-column prop="wxOpenId" label="职工微信">
            </el-table-column>
            <el-table-column prop="wxNickname" label="职工微信的昵称">
            </el-table-column>
            <el-table-column prop="state" label="状态 ">
                <template slot-scope="scope">{{ stateOptions[scope.row.state] }}</template>
            </el-table-column>
            <el-table-column prop="workerType" label="职工类型">
                <template slot-scope="scope">{{ workerTypeOptions[scope.row.workerType] }}</template>
            </el-table-column>
            <el-table-column prop="regTime" label="导入时间">
                <template slot-scope="scope">{{ scope.row.regTime | formatDate2("YYYY-MM-DD") }}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width='180'>
                <template slot-scope="scope">
                    <el-button @click="updateWorkerInfo(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button @click="deleteRoleLoad(scope.row)" type="warning" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
    <el-dialog :title="optionType=='update'?'编辑职工信息':'新增职工信息'" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :modal="false" width="35%">
        <div style="padding-top:20px">
            <el-form :model="form" ref="form" :rules="rules" label-width="120px">
                <el-form-item label="主键" prop="sn" v-show="false">
                    <el-input v-model="form.sn" type="text" readonly clearable size="medium"></el-input>
                </el-form-item>
                <el-form-item label="职工姓名" prop="name">
                    <el-input v-model="form.name" type="text" clearable size="medium" maxlength='10'></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="form.mobile" type="text" clearable size="medium" maxlength='20'></el-input>
                </el-form-item>
                <el-form-item label="职工类型" :label-width="formLabelWidth" prop="workerType">
                    <el-select v-model="form.workerType" clearable size="medium">
                        <el-option v-for="(item,key) in workerTypeOptions" :key="key" clearable :label="item" :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
                    <el-select v-model="form.state" clearable size="medium">
                        <el-option v-for="(value,key) in stateOptions" :key="key" clearable :label="value" :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div style="text-align:right" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateWorkerF()">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="导入失败数据" :visible.sync="dialogFormRemak" :close-on-click-modal="false" :modal="false" width="60%">
        <div style="padding-top:20px">
            <el-table :data="tableData" stripe border size="small" highlight-current-row style="width: 100%">
                <el-table-column prop="name" label="职工名字">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号">
                </el-table-column>
                <el-table-column prop="remarks" label="失败原因">
                </el-table-column>
            </el-table>
        </div>
        <div style="text-align:right" class="dialog-footer">
            <el-button @click="dialogFormRemak = false">取 消</el-button>
        </div>
    </el-dialog>
    <el-dialog title="删除职工" :visible.sync="dialogFormVisibleDelete" :close-on-click-modal="false" :modal="false" width="35%">
        <p>确定要删除职工<span style="color:#67C23A;font-size:20px;font-weight:bold">{{deleteWorkerName}}</span>吗？</p>
        <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="dialogFormVisibleDelete = false">取消</el-button>
            <el-button type="primary" size="mini" @click="deleteRoleFun()">确定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    queryWorkerBypager,
    updateWorkerBysn,
    addWorker,
    deleteWorker
} from "@/api/worker/worker.js";
import {
    loadRole
} from "@/api/role/role.js";
export default {
    name: "staffInfo",
    data() {
        var name = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请输入职工名字"));
            }else{
                callback();
            }
        }
        var mobile = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("手机号码不能为空！"));
            } else if (!/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(value)) {
                return callback(new Error("手机号码格式不正确！"));
            } else {
                callback();
            }
        };
        var state = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请选择状态"));
            }
        }
        var workerType = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请选择职工类型"));
            }
        }
        return {
            loading: false,
            optionType:"",
            form: {
                sn: '',
                name: '',
                mobile: '',
                state: '',
                workerType: ''
            },
            deleteWorkerName:'',
            batchUrl:process.env.API_ROOT+"/mealManager/woker/batchImportWorker",
            serchName: '',
            type: "",
            total: 0,
            pageSize: 10,
            snDelete: '',
            pageNumber: 1,
            tableData2: [],
            serchWorkerType: '',
            tableData: [],
            dialogFormVisible: false,
            dialogFormRemak: false,
            dialogFormVisibleDelete: false,
            stateOptions: { /* 状态 */
                '00': '生效',
                '99': '注销'
            },
            workerTypeOptions: { /* 员工类型 */ },
            rules: {
                name: [{
                    validator: name,
                    trigger: "blur"
                }],
                mobile: [{
                    validator: mobile,
                    trigger: "blur"
                }],
                state: [{
                    validator: state,
                    trigger: "blur"
                }],
                workerType: [{
                    validator: workerType,
                    trigger: "blur"
                }]
            }
        }
    },
    mounted() {
        this.firstQuery();
        this.loadFun();
    },
    methods: {
        firstQuery() {
            var data = {
                name: this.serchName,
                pageSize: 10,
                pageNumber: 1,
                workerType: this.serchWorkerType
            }
            this.queryWorkerList(data);
        },
        nextQuery() {
            var data = {
                name: this.serchName,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber,
                workerType: this.serchWorkerType
            }
            this.queryWorkerList(data);
        },
        queryWorkerList(data) {
            this.loading = true;
            queryWorkerBypager(data).then(response => {
                this.loading = false;
                if (response.status=="success") {
                    this.tableData2 = response.list;
                    this.total = response.data.pageInfo.total;
                } else {
                    this.$message.error(response.msg);
                }
            }).catch(error=>{
                this.loading = false;
                this.$message.error("系统异常");
            })
        },
        updateWorkerInfo(row) {
            this.resetForm();
            this.form.sn = row.sn;
            this.form.name = row.name;
            this.form.mobile = row.mobile;
            this.form.state = row.state;
            this.form.workerType = row.workerType+'';
            this.optionType = "update";
            this.dialogFormVisible = true;
        },
        addFunLoad() {
            this.resetForm();
            this.dialogFormVisible = true;
            this.optionType = "add";
        }, 
        modelFun(){
        window.open(process.env.API_ROOT+"/mealManager/woker/downModel?aa='dsadfasd'");
        },
        resetForm() {
            if (this.$refs["form"] !== undefined) {
                this.$refs["form"].resetFields();
            }
            this.form.state = '00';
            this.form.name='';
            this.form.mobile='';
            this.form.workerType='';
        },
        deleteRoleLoad(worker) {
            this.snDelete = worker.sn;
            this.deleteWorkerName=worker.name;
            this.dialogFormVisibleDelete = true;
        },
        deleteRoleFun() {
            var data = {
                workerSn: this.snDelete + '',
            }
            deleteWorker(data).then(response => {
                if (response.status == 'success') {
                    this.firstQuery();
                    this.$message.success('删除职工成功');
                    this.dialogFormVisibleDelete = false;
                } else if (response.status == 'error') {
                    this.$message.error('删除职工失败');
                } else {
                    this.$message.error('删除职工异常');
                }
            })
        },
        updateWorkerF() {
            if (this.form.name == null || this.form.name == "") {
                this.$message.error("请填写姓名");
                return;
            } else if (this.form.mobile == null || this.form.mobile == "") {
                this.$message.error("手机号不能为空");
                return;
            } else if (!/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(this.form.mobile)) {
                this.$message.error("请输入正确的手机号");
                return;
            } else if (this.form.state == null || this.form.state == "") {
                this.$message.error("请选择正确的状态");
                return;
            } else if (this.form.workerType == null || this.form.workerType == "") {
                this.$message.error("请选择职工类型");
                return;
            }
            if (this.optionType=="add") {
                var data = {
                    name: this.form.name,
                    mobile: this.form.mobile,
                    state: this.form.state,
                    workerType:parseInt(this.form.workerType) //returns 1234 
                }
                addWorker(data).then(response => {
                    if (response.status == 'success') {
                        this.dialogFormVisible = false;
                        this.$message.success('新增成功');
                        this.firstQuery();
                    } else if (response.status == 'error') {
                        this.$message.error(response.msg);
                    } else {

                    }
                })
            } else if (this.optionType=="update"){
                var data = {
                    sn: this.form.sn,
                    name: this.form.name,
                    mobile: this.form.mobile,
                    state: this.form.state,
                    workerType:parseInt(this.form.workerType)
                }
                updateWorkerBysn(data).then(response => {
                    if (response.status == 'success') {
                        this.dialogFormVisible = false;
                        this.$message.success('修改成功');
                        this.firstQuery();
                    } else if (response.status == 'error') {
                        this.$message.error(response.msg);
                    } else {

                    }
                })
            }

        },
        submitUpload() {
            console.log("---1----------");
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log("----2---------");
        },
        successFun(response, file, fileList) {
            if (response.status == 'success') {
                this.$message.success('批量新增已完成');
            } else {
                this.$message.error(response.msg);
            }
            if (response.data.errorList.length > 0) {
                this.tableData = response.data.errorList;
                this.dialogFormRemak = true;
            }
            this.firstQuery();
        },
        errorFun(response, file, fileList) {
            this.$message.error('批量新增失败');
        },
        loadFun() {
            var data = {

            }
            loadRole(data).then(response => {
                if (response.status == 'success') {
                    this.workerTypeOptions = response.data.loadData;
                } else if (response.status == 'error') {
                    this.$message.error(response.msg);
                } else {
                    this.$message.error("加载失败");
                }
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
