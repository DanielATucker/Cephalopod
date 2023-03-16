import 'smart-webcomponents-react/source/styles/smart.default.css';
import React from "react";
import ReactDOM from 'react-dom/client';
import { Button, RepeatButton, ToggleButton, PowerButton } from 'smart-webcomponents-react/button';
import { Calendar } from 'smart-webcomponents-react/calendar';
import { Input } from 'smart-webcomponents-react/input';
import { Tree, TreeItem, TreeItemsGroup } from 'smart-webcomponents-react/tree';
import { Scheduler } from 'smart-webcomponents-react/scheduler';


class Calendar1 extends React.Component {
	constructor(props) {
		super(props);

		this.scheduler = React.createRef();
		this.calendar = React.createRef();
		this.tree = React.createRef();
		this.primaryContainer = React.createRef();

		const today = new Date(),
		currentDate = today.getDate(),
		currentYear = today.getFullYear(),
		currentMonth = today.getMonth();

		this.nonworkingDays = this.getPastThreeWeekdays(today.getDay());

		this.data = [{
			label: 'Update Employees Information',
			dateStart: new Date(currentYear, currentMonth, currentDate, 14, 0),
			dateEnd: new Date(currentYear, currentMonth, currentDate, 16, 45),
			class: 'event'
		}
		];
	}

	view = 'week';

	views = ['day',
		{
			type: 'week',
			hideWeekend: false,
		},
		{
			type: 'month',
			hideWeekend: false,
			shortcutKey: 'm',
		}, 'agenda'
	];

	firstDayOfWeek = 1;

	disableDateMenu = false;

	currentTimeIndicator = true;

	scrollButtonsPosition = 'far';

	getPastThreeWeekdays(weekday) {
		let weekdays = [];

		for (let i = 0; i < 3; i++) {
			weekdays.push((weekday - i + 7) % 7);
		}

		return weekdays;
	}

	handleToggle() {
		const primaryContainer = this.primaryContainer.current,
			scheduler = this.scheduler.current;

		primaryContainer.classList.toggle('collapse');
		scheduler.disableDateMenu = !primaryContainer.classList.contains('collapse');
	}

	addNew() {
		this.scheduler.current.openWindow({
			class: 'event'
		});
	}

	handleCalendarChange(event) {
		this.scheduler.current.dateCurrent = event.detail.value;
	}

	handleTreeChange() {
		const tree = this.tree.current;
		let selectedIndexes = tree.selectedIndexes, types = [];

		for (let i = 0; i < selectedIndexes.length; i++) {
			tree.getItem(selectedIndexes[i]).then(result => {
				types.push(result.value);

				if (i === selectedIndexes.length - 1) {
					this.scheduler.current.dataSource = this.data.filter(d => types.indexOf(d.class) > -1);
				}
			});
		}
	}

	handleDateChange(event) {
		this.scheduler.current.selectedDates = [event.detail.value];
	}

	init() {
	}

	componentDidMount() {
		this.init();
	};

	componentDidUpdate(prevProps) {
		if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
			if (this.props.isLoggedIn === true) {
				this.getCalendarData();
			}
		};
	};

	getCalendarData = async () => {
        const response = await fetch('https://100.108.10.15:3001/calendar/get_events', {
            method: 'GET',
            credentials: "include"
        });

        let node = await response.json();

        if ((node !== "No node found") && (node !== "undefined") ) {
            this.calendarHandler(node);
        }
    };

	calendarHandler = (node) => {
		console.log(`Calendar in: ${JSON.stringify(JSON.parse(node), null, 2)}`);
	};

	refreshData(action, eventItem) {
		let newData;

		switch (action) {
			case 'update':
				/*
					action: 'update',
					query: `SET Label = "${eventItem.label}", DateStart = "${eventItem.dateStart.toISOString()}", DateEnd = "${eventItem.dateEnd.toISOString()}", Description = "${eventItem.description}", AllDay = "${!!eventItem.allDay}" 
							WHERE EventID = ${eventItem.id};`
				*/

				console.log(`Updated ${JSON.stringify(eventItem, null, 2)}`);

				break;
			case 'insert':
				console.log(`Inserting ${JSON.stringify(eventItem, null, 2)}`);

				console.log(JSON.stringify(eventItem.detail, null, 2));
				
				fetch(`https://100.108.10.15:3001/calendar/add_event/:${eventItem.item.title}`, {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"eventData": eventItem.item,
						"eventTitle": eventItem.item.title
					}),
					credentials: "include"
				});
				/*
					action: 'insert',
					query: `("${eventItem.label}","${eventItem.dateStart.toISOString()}","${eventItem.dateEnd.toISOString()}","${eventItem.description || ''}","${!!eventItem.allDay}");`
				*/
				break;
			case 'delete':
				/*
				newData = window.demoServer.getData({
					action: 'delete',
					query: `EventID = ${eventItem.id};`
				});
				*/
				break;
			default:
				console.log(JSON.stringify(`Default: ${newData}`, null, 2));
				break;
		}

		if (newData) {
			//Update the Scheduler
			this.scheduler.current.dataSource = new window.Smart.DataAdapter({
				dataSource: newData,
				dataSourceType: 'array',
				dataFields: [{
					name: 'id',
					map: 'EventID',
					dataType: 'number'
				},
				{
					name: 'label',
					map: 'Label',
					dataType: 'string'
				},
				{
					name: 'dateStart',
					map: 'DateStart',
					dataType: 'string'
				},
				{
					name: 'dateEnd',
					map: 'DateEnd',
					dataType: 'string'
				},
				{
					name: 'description',
					map: 'Description',
					dataType: 'string'
				},
				{
					name: 'allDay',
					map: 'AllDay',
					dataType: 'string'
				}
				]
			});
		}
	}

	handleItemUpdate(event) {
		console.log(`Update: ${event.detail}`);

		this.refreshData('update', event.detail.item);
	};

	handleItemRemove(event) {
		this.refreshData('delete', event.detail.item);
	};

	handleItemInsert(event) {
		console.log(`Insert: ${event.detail}`);

		this.refreshData('insert', event.detail);
	};

	updateData(event) {
		console.log(`Updated Data: ${JSON.stringify(event, null, 2)}`);

		const item = event.detail.item,
			data = this.data;

		for (let i = 0; i < data.length; i++) {
			const dataItem = data[i];

			if (dataItem.label === item.label && dataItem.class === item.class) {
				event.type === 'itemRemove' ? this.data.splice(i, 1) : data.splice(i, 1, item);
				return;
			}
		}
	};

	render() {
		return (
			<div>
				<div id="primaryContainer" ref={this.primaryContainer}>
					<div id="header">
						<Button id="toggleButton" onClick={this.handleToggle.bind(this)}></Button>
						<div id="title">Scheduler</div>
						<Button id="addNew" className="floating" onClick={this.addNew.bind(this)}><span>Create</span>
						</Button>
					</div>

					<div className="content">
						<section id="sideA">
							<div className="button-container">
								<div id="logo"></div>
							</div>
						</section>

						<section id="sideB">
							<Scheduler ref={this.scheduler} id="scheduler" dataSource={this.data} view={this.view} views={this.views} nonworkingDays={this.nonworkingDays}
								firstDayOfWeek={this.firstDayOfWeek}
								//disableDateMenu={this.disableDateMenu}
								currentTimeIndicator={this.currentTimeIndicator}
								scrollButtonsPosition={this.scrollButtonsPosition} onDragEnd={this.updateData.bind(this)}
								onResizeEnd={this.updateData.bind(this)}
								onItemUpdate={this.handleItemUpdate.bind(this)}
								onItemRemove={this.handleItemRemove.bind(this)}
								onItemInsert={this.handleItemInsert.bind(this)}
								onDateChange={this.handleDateChange.bind(this)}></Scheduler>
						</section>
					</div>
				</div>
			</div>
		);
	}
}



export default Calendar1;
	