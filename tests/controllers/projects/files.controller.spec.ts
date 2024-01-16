import moment from 'moment';

describe('Project Files Test Suite', () => {
    const payload = [
        {
          'ITEM NUMBER': 'P-1',
          'TASK DESCRIPTION': 'Parent1',
          'STAGE 1': 'Materials Procurement',
          'STAGE 2': 'Materials Delivery',
          'STAGE 3': 'Activity Started',
          'STAGE 4': 'Activity On-going',
          'STAGE 5': 'Activity Complete',
          'TASK START DATE': '2023-10-09T16:00:00.000Z',
          'TASK END DATE': '2023-10-16T16:00:00.000Z',
          'TASK AMOUNT': 50000
        },
        {
          'ITEM NUMBER': 'P-1-A',
          'TASK DESCRIPTION': '1.1 Child',
          'TASK START DATE': '2023-10-09T16:00:00.000Z',
          'TASK END DATE': '2023-10-13T16:00:00.000Z',
          'TASK AMOUNT': 25000
        },
        {
          'ITEM NUMBER': 'ITEM NUMBER',
          'TASK DESCRIPTION': 'TASK DESCRIPTION',
          'STAGE 1': 'STAGE 1',
          'STAGE 2': 'STAGE 2',
          'STAGE 3': 'STAGE 3',
          'STAGE 4': 'STAGE 4',
          'STAGE 5': 'STAGE 5'
        },
        {
          'ITEM NUMBER': 'P-2',
          'TASK DESCRIPTION': 'Parent2',
          'STAGE 1': 'Materials Procurement',
          'STAGE 2': 'Materials Delivery',
          'STAGE 3': 'Activity Started',
          'STAGE 4': 'Activity On-going',
          'STAGE 5': 'Activity Complete',
          'TASK START DATE': '2023-10-16T16:00:00.000Z',
          'TASK END DATE': '2023-10-26T16:00:00.000Z',
          'TASK AMOUNT': 75000
        },
        {
          'ITEM NUMBER': 'P-2-A',
          'TASK DESCRIPTION': '2.1 Child',
          'TASK START DATE': '2023-10-16T16:00:00.000Z',
          'TASK END DATE': '2023-10-19T16:00:00.000Z',
          'TASK AMOUNT': 50000
        },
        {
          'ITEM NUMBER': 'P-2-A-1',
          'TASK DESCRIPTION': '2.1.1 Subtask',
          'TASK START DATE': '2023-10-16T16:00:00.000Z',
          'TASK END DATE': '2023-10-17T16:00:00.000Z',
          'TASK AMOUNT': 30000
        },
        {
          'ITEM NUMBER': 'P-2-A-2',
          'TASK DESCRIPTION': '2.1.2 Subtask',
          'TASK START DATE': '2023-10-17T16:00:00.000Z',
          'TASK END DATE': '2023-10-19T16:00:00.000Z',
          'TASK AMOUNT': 30000
        },
        {
          'ITEM NUMBER': 'P-2-B',
          'TASK DESCRIPTION': '2.2 Child',
          'TASK START DATE': '2023-10-19T16:00:00.000Z',
          'TASK END DATE': '2023-10-21T16:00:00.000Z',
          'TASK AMOUNT': 55000
        },
        {
          'ITEM NUMBER': 'P-2-C',
          'TASK DESCRIPTION': '2.3 Child',
          'TASK START DATE': '2023-10-21T16:00:00.000Z',
          'TASK END DATE': '2023-10-26T16:00:00.000Z',
          'TASK AMOUNT': 25000
        },
        {
          'ITEM NUMBER': 'P-2-C-1',
          'TASK DESCRIPTION': '2.3.1 Subtask',
          'TASK START DATE': '2023-10-21T16:00:00.000Z',
          'TASK END DATE': '2023-10-26T16:00:00.000Z',
          'TASK AMOUNT': 30000
        }
      ]
    
    function processWorksheet(data: any){
        const projectTask = {
            'project_id': 0,
            'project_task_name': '',
            'project_task_type_id': 0,
            'task_start_date': '',
            'task_end_date': '',
            'amount': 0.00,
            'stage_one': '',
            'stage_two': '',
            'stage_three': '',
            'stage_four': '',
            'stage_five': '',
            'projectSubTask': {
                'project_task_type_id': 0,
                'project_task_id': 0,
                'project_sub_task_name': '',
                'project_child_task_id': 0,
                'task_start_date': '',
                'task_end_date': '',
                'amount': 0,
            }
        };
        let parentId: number = 0;
        let childId: number = 0; 
        if (data != undefined) {
            for (let i = 0; i < data.length; i++) {
                const item = data[i]['ITEM NUMBER'];
                const taskDescription = data[i]['TASK DESCRIPTION'];
                const startDate = data[i]['TASK START DATE'];
                const endDate = data[i]['TASK END DATE'];
                const amount = data[i]['TASK AMOUNT'];
                const stage1 = data[i]['STAGE 1'];
                const stage2 = data[i]['STAGE 2'];
                const stage3 = data[i]['STAGE 3'];
                const stage4 = data[i]['STAGE 4'];
                const stage5 = data[i]['STAGE 5'];
                const itemArr = item.split("-");
                /** Parent Task */
                if (itemArr.length === 2) {
                    projectTask.project_id = 1;
                    projectTask.project_task_name = taskDescription;
                    projectTask.project_task_type_id = 1;
                    projectTask.task_start_date = startDate;
                    projectTask.task_end_date = endDate;
                    projectTask.amount = amount;
                    projectTask.stage_one = stage1;
                    projectTask.stage_two = stage2;
                    projectTask.stage_three = stage3;
                    projectTask.stage_four = stage4;
                    projectTask.stage_five = stage5;
                    parentId = projectTask.project_id;
                }
                /** Child Task */
                if (itemArr.length === 3) {
                    projectTask.projectSubTask.project_task_type_id = 2;
                    projectTask.projectSubTask.project_task_id = parentId ? parentId : 0;
                    projectTask.projectSubTask.project_sub_task_name = taskDescription;
                    projectTask.projectSubTask.task_start_date = startDate;
                    projectTask.projectSubTask.task_end_date = endDate;
                    projectTask.projectSubTask.amount = amount;
                    childId = 666;
                }
                /** Sub Task */
                if (itemArr.length === 4) {
                    projectTask.projectSubTask.project_task_type_id = 3;
                    projectTask.projectSubTask.project_child_task_id = childId;
                    projectTask.projectSubTask.project_task_id = parentId;
                    projectTask.projectSubTask.project_sub_task_name = taskDescription;
                    projectTask.projectSubTask.task_start_date = startDate;
                    projectTask.projectSubTask.task_end_date = endDate;
                    projectTask.projectSubTask.amount = amount;
                }
            }
        }
        return projectTask;
    }
    // const res = httpMocks.createResponse();
    it('Check if Parent Task Test Case', () => {
        
        const result = processWorksheet(payload)
        // last parent entry
        expect(result.project_task_name).toEqual('Parent2');
    });
    it('Check if Child Task Test Case', () => {
        
        const result = processWorksheet(payload)
        // last child entry
        expect(result.projectSubTask.project_child_task_id).toEqual(666);
    });
    it('Check if Sub Task Test Case', () => {
        
        const result = processWorksheet(payload)
        // last subtask entry
        expect(result.projectSubTask.project_sub_task_name).toEqual('2.3.1 Subtask');
    });
    it('Check if Parent Stage 1 Test Case', () => {
        
        const result = processWorksheet(payload)
        // last parent stage one
        expect(result.stage_one).toEqual('Materials Procurement');
    });
    it('Check if Parent Stage 2 Test Case', () => {
        
        const result = processWorksheet(payload)
        // last parent stage two
        expect(result.stage_two).toEqual('Materials Delivery');
    });
    it('Check if Parent Stage 3 Test Case', () => {
        
        const result = processWorksheet(payload)
        // last parent stage three
        expect(result.stage_three).toEqual('Activity Started');
    });
    it('Check if Parent Stage 4 Test Case', () => {
        
        const result = processWorksheet(payload)
        // last parent stage four
        expect(result.stage_four).toEqual('Activity On-going');
    });
    it('Check if Parent Stage 5 Test Case', () => {
        
        const result = processWorksheet(payload)
        // last parent stage five
        expect(result.stage_five).toEqual('Activity Complete');
    });
    it('Check if Parent Task Start Date Test Case', () => {
        
        const result = processWorksheet(payload)
        // last parent task start date
        expect(result.task_start_date).toEqual('2023-10-16T16:00:00.000Z');
    });
    it('Check if Parent Task End Date Test Case', () => {
        
        const result = processWorksheet(payload)
        // last parent task end date
        expect(result.task_end_date).toEqual('2023-10-26T16:00:00.000Z');
    });
    it('Check if Parent Task Amount Test Case', () => {
        
        const result = processWorksheet(payload)
        // last parent task amount
        expect(result.amount).toEqual(75000);
    });
    it('Check if Sub Task Start Date Test Case', () => {
        
        const result = processWorksheet(payload)
        // last sub task start date
        expect(result.projectSubTask.task_start_date).toEqual('2023-10-21T16:00:00.000Z');
    });
    it('Check if Sub Task End Date Test Case', () => {
        
        const result = processWorksheet(payload)
        // last sub task end date
        expect(result.projectSubTask.task_end_date).toEqual('2023-10-26T16:00:00.000Z');
    });
    it('Check if Sub Task Amount Test Case', () => {
        
        const result = processWorksheet(payload)
        // last sub task amount
        expect(result.projectSubTask.amount).toEqual(30000);
    });

    it('Check if Project End Date Exceeds Task End Date Test Case', async () => {
        // const startDate = "12"
        const endDate = "2023-12-25"
        // const pStartDate = ""
        const pEndDate = "2023-12-30"
        // const sDate = moment(startDate);
        const eDate = moment(endDate);
        // const psDate = moment(pStartDate);
        const peDate = moment(pEndDate);

        let result;
        if (eDate.diff(peDate, 'days') > 0) {
            result = false
        } else {
            result = true
        }

        expect(result).toBe(true);
    });

    it('Check if Task End Date does not exceed or is equal to Project End Date Test Case', async () => {
        // const startDate = "12"
        const endDate = "2023-12-30"
        // const pStartDate = ""
        const pEndDate = "2023-12-30"
        // const sDate = moment(startDate);
        const eDate = moment(endDate);
        // const psDate = moment(pStartDate);
        const peDate = moment(pEndDate);

        let result;
        if (eDate.diff(peDate, 'days') > 0) {
            result = false
        } else {
            result = true
        }

        expect(result).toBe(true);
    });
    it('Check if Task Start Date does not exceed or is equal to Project Start Date Test Case', async () => {
        const startDate = "2023-11-30"
        const pStartDate = "2023-11-30"
        const sDate = moment(startDate);
        const psDate = moment(pStartDate);

        let result;
        if (sDate.diff(psDate, 'days') > 0) {
            result = false
        } else {
            result = true
        }

        expect(result).toBe(true);
    });
    it('Check if Task Start Date started before the Project Start Date Test Case', async () => {
        const startDate = "2023-11-01"
        const pStartDate = "2023-11-30"
        const sDate = moment(startDate);
        const psDate = moment(pStartDate);

        let result;
        console.log(sDate.diff(psDate, 'days'));
        if (sDate.diff(psDate, 'days') < 0) {
            result = true
        } else {
            result = false
        }
        expect(result).toBe(true);
    });
    it('Check if Task Start Date started on or after the Project Start Date Test Case', async () => {
        const startDate = "2023-12-01"
        const pStartDate = "2023-11-30"
        const sDate = moment(startDate, 'YYYY-MM-DD');
        const psDate = moment(pStartDate, 'YYYY-MM-DD');

        let result;
        
        if (sDate.diff(psDate, 'days') < 0) {
            result = false
        } else {
            result = true
        }
        expect(result).toBe(true);
    });
});

