const historyTracker = {
    template: ` <div>
                    <h3>History</h3>
                    <div class="col">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="job in history">
                            <a href="#" @click="post(job.keyword)">{{ job.title }} {{ job.time }}</a>
                        </li>
                    </ul>
                    </div>
                </div>`,
    props: ['history'],
    methods: {
        post: async function (keyword) {
            console.log(keyword);
            application.getHistory(keyword);
        },
    }
};

const application = new Vue({
    el: '#openSkillsApi',
    data: {
        jobList: {},
        enteredKeyword: "",
        searched: false,
        jobEntered: false,
        history: [],
        relatedJob: "",
        imageLink: "https://uganda.ug/wp-content/uploads/2020/04/uganda-jobs.jpg"
        }
    ,
    methods: {
        search: async function () {
            const value = this.enteredKeyword.trim();
            this.searched = true;
            const response = await axios.get(`http://localhost:8888/api/search`, {
                params: {
                    keyword: value
                }
            });
            this.jobList = response.data;
            //joblist contains uuid, suggestion, normalized_job_title, parent_uuid
            //flter jobList to only contain id and title
            const array = this.jobList.map(element => {
                return { id: element.uuid, title: element.suggestion, keyword: value };
            });
            this.jobList = array;
            this.jobEntered = true;
        },
        post: async function (id, title, keyword) {
            const now = new Date().toLocaleString('en-US');
            this.relatedJob = title;
            this.jobEntered = false;
            this.history.push({ id: id, title: title, time: now, keyword: keyword});
            const response = await axios.post(`http://localhost:8888/api/fetchId`, { id: id });
            this.jobList = response.data;
            const array = this.jobList.map(element => {
                return { title: element.title };
            });
            this.jobList = array;
        },
        getHistory: async function (keyword) {
            this.searched = true;
            const response = await axios.get(`http://localhost:8888/api/search`, {
                params: {
                    keyword: keyword
                }
            });
            this.jobList = response.data;
            const array = this.jobList.map(element => {
                return { id: element.uuid, title: element.suggestion, keyword:  keyword};
            });
            this.jobList = array;
            this.jobEntered = true;
        },
        reset: function () {
            this.searched = false;
            this.jobEntered = false;
        }
    },
    components: {
        'tracker-component': historyTracker
    }
});