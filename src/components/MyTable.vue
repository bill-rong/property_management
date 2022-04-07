<template>
  <div>
     <el-table
      ref="table"
      :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">

      <el-table-column
      v-for="(item, index) in tableColumn"
      :sortable=item.sortable
      :type=item.type
      :prop=item.prop
      :label=item.label
      :width=item.width
      :key=index>
      </el-table-column>
      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="editShow"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next, jumper, total"
        :total="total" 
        :page-size="pageSize" 
        :current-page="currentPage"
        @current-change="changePage"
        style="margin-top: 5px;">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableColumn: {
      type: Array,
      default: []
    },
    tableData: {
      type: Array,
      default: []
    },
    pageSize: {
      type: Number,
      default: 7
    },
    currentPage: {
      type: Number,
      default: 1
    },
    editShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // total: this.tableData.length,
      multipleSelection: []
    }
  },
  computed: {
    total() {
      return this.tableData.length;
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },
    handleEdit(index, row) {
      this.$emit("edit", index, row);
    },
    handleDelete(index, row) {
      this.$emit("delete", index, row);
    },
    handleSelectionChange(selection) {
      console.log(selection);
    }
  }
}
</script>

<style>
.el-pagination{
  position: relative;  
  text-align: left;
}

</style>