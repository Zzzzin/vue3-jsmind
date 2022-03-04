<script setup lang="ts">
import {reactive,ref} from "vue";

const mind = reactive({
    meta: {
        name: 'jsMind remote',
        author: 'zin',
        version: '1.0',
    },
    format: 'node_tree',
    data: {
        id: 'root',
        topic: 'jsMind',
        children: [
            {
                id: 'easy',
                topic: 'Easy',
                direction: 'left',
                //expanded: false,
                children: [
                    { id: 'easy1', topic: 'Easy to show' },
                    { id: 'easy2', topic: 'Easy to edit' },
                    { id: 'easy3', topic: 'Easy to store' },
                    { id: 'easy4', topic: 'Easy to embed' },
                ],
            },
            {
                id: 'open',
                topic: 'Open Source',
                direction: 'right',
                expanded: true,
                children: [
                    { id: 'open1', topic: 'on GitHub' },
                    { id: 'open2', topic: 'BSD License' },
                ],
            },
            {
                id: 'powerful',
                topic: 'Powerful',
                direction: 'right',
                children: [
                    { 'id': 'powerful1', 'topic': 'Base on Javascript', 'background-color': '#0000ff' },
                    { 'id': 'powerful2', 'topic': 'Base on HTML5', 'border-radius': '50px' },
                    { 'id': 'powerful3', 'topic': 'Depends on you', 'foreground-color': '#33ff33' },
                    { 'id': 'powerful4', 'topic': 'Depends on you', 'border-color': '#33ff33' },
                ],
            },
            {
                id: 'other',
                topic: 'test node',
                direction: 'left',
                children: [
                    { id: 'other1', topic: "I'm from local variable" },
                    { id: 'other2', topic: 'I can do everything' },
                ],
            },
        ],
    },
});
const options = reactive({
    container: 'jsmind_container', // [必选] 容器的ID
    editable: false, // [可选] 是否启用编辑
    theme: 'custom', // [可选] 主题
    view: {
        engine: 'canvas', // 思维导图各节点之间线条的绘制引擎
        hmargin: 100, // 思维导图距容器外框的最小水平距离
        vmargin: 50, // 思维导图距容器外框的最小垂直距离
        line_width: 2, // 思维导图线条的粗细
        line_color: '#B3CDFF', // 思维导图线条的颜色
    },
});
const isShow = ref(true);
const initJM = () => {
    let jmNode = document.getElementsByTagName('jmnode');
    for (let i = 0; i < jmNode.length; i++) {
        (jmNode[i] as HTMLElement).style.borderColor = (jmNode[i] as HTMLElement).style.color;

        // if(jmNode[i]){
        //
        // }
        jmNode[i].addEventListener('click', () => {
            //选中变色
            // for (let i = 0; i < jmNode.length; i++) {
            //     if(jmNode[i].getAttribute("class") === ' selected' && jmNode[i].style.borderColor){
            //         jmNode[i].style.backgroundColor = jmNode[i].style.borderColor;
            //         jmNode[i].style.color = '#fff';
            //     }else {
            //         jmNode[i].style.backgroundColor = '#fff';
            //         jmNode[i].style.color = jmNode[i].style.borderColor;
            //     }
            // }
            //console.log('qqq', event)
            //showModal.value = !showModal.value;
        });
        jmNode[i].addEventListener('mouseenter', () => {
            //showTips(event, event.target.attributes.nodeid.value);
            //console.log('www', event)
        });
        jmNode[i].addEventListener('mouseleave', () => {
            //hideTips();
        });
    }
};
</script>

<template>
    <jsMind :values="mind" :options="options" v-show="isShow" height="1000px" @initJM="initJM"></jsMind>
</template>

<style>
</style>
