import 'smart-webcomponents-react/source/styles/smart.default.css';
import React from "react";
import ReactDOM from 'react-dom/client';
import { Button, RepeatButton, ToggleButton, PowerButton } from 'smart-webcomponents-react/button';
import { Calendar } from 'smart-webcomponents-react/calendar';
import { Input } from 'smart-webcomponents-react/input';
import { Tree, TreeItem, TreeItemsGroup } from 'smart-webcomponents-react/tree';
import { Scheduler } from 'smart-webcomponents-react/scheduler';

import { ProgressBar } from 'smart-webcomponents-react/progressbar';
import { Rating } from 'smart-webcomponents-react/rating';


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

		this.state ={
			"data":  [
				{}
			]
		};
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

	componentDidUpdate(prevProps) {
		if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
			if (this.props.isLoggedIn === true) {
				setTimeout(this.getCalendarData, 3000);
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
		node = JSON.parse(node);

		if (Array.isArray(node)) {
			console.log(JSON.stringify(node, null, 2));

			this.setState({
				"data": node
			});
		}
		else {			
			this.setState({
				"data": node
			});
		}
	};

	refreshData(action, eventItem) {
		switch (action) {
			case 'update':
				fetch(`https://100.108.10.15:3001/calendar/add_event/${eventItem.label}`, {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"eventData": eventItem,
						"eventTitle": eventItem.label
					}),
					credentials: "include"
				});

				break;
			case 'insert':				
				fetch(`https://100.108.10.15:3001/calendar/add_event/${eventItem.label}`, {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"eventData": eventItem,
						"eventTitle": eventItem.label
					}),
					credentials: "include"
				});

				break;
			case 'delete':				
				fetch(`https://100.108.10.15:3001/calendar/del_event`, {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"eventData": eventItem,
						"eventTitle": eventItem.label
					}),
					credentials: "include"
				});

				break;
			default:
				console.log(JSON.stringify(`Default:`, null, 2));
				break;
		}

		setTimeout(this.getCalendarData, 3000);
	}

	handleItemUpdate(event) {
		this.refreshData('update', event.detail.item);
	};

	handleItemRemove(event) {
		this.refreshData('delete', event.detail.item);
	};

	handleItemInsert(event) {
		this.refreshData('insert', event.detail);
	};

	updateData(event) {
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

	handleEditDialogOpen(event) {
		const editors = event.detail.editors;

		if (!editors) {
			return;
		}


		const schedulerEvent = event.detail.item,
			descriptionEditor = editors.description,
			dateStartEditor = editors.dateStart,
			dateEndEditor = editors.dateEnd,
			labelEditor = editors.label,
			allDayEditor = editors.allDay,
			repeatEditor = editors.repeat,
			editorsContainer = editors.description.parentElement;

		console.log(`Event: ${JSON.stringify(schedulerEvent, null, 2)}`);

		dateStartEditor.querySelector('.smart-element').disabled = false;
		dateEndEditor.querySelector('.smart-element').disabled = false;

		// repeatEditor.classList.add('smart-hidden');
		// allDayEditor.classList.add('smart-hidden');

		labelEditor.querySelector('.smart-element').placeholder = 'Enter a label...';
		descriptionEditor.querySelector('.smart-element').placeholder = 'Enter a description for the event..';

		<Rating id="eventRating"></Rating>

		//ProgressBar
		let progressElement = editorsContainer.querySelector('#eventProgress');

		if (!progressElement) {
			const elementContainer = document.createElement('div');

			ReactDOM.createRoot(<div>
				<label>Progress: </label>
				<ProgressBar id="eventProgress" showProgressValue></ProgressBar>
			</div>, elementContainer, function () {
				this.querySelector('#eventProgress').value = schedulerEvent.progress || 0;
			});

			editorsContainer.appendChild(elementContainer);
		}
		else {
			progressElement.value = schedulerEvent.progress || 0;
		}
	}

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
							<Scheduler ref={this.scheduler} id="scheduler" dataSource={this.state.data} view={this.view} views={this.views} nonworkingDays={this.nonworkingDays}
								firstDayOfWeek={this.firstDayOfWeek}
								//disableDateMenu={this.disableDateMenu}
								currentTimeIndicator={this.currentTimeIndicator}
								scrollButtonsPosition={this.scrollButtonsPosition} onDragEnd={this.updateData.bind(this)}
								onResizeEnd={this.updateData.bind(this)}
								onItemUpdate={this.handleItemUpdate.bind(this)}
								onItemRemove={this.handleItemRemove.bind(this)}
								onItemInsert={this.handleItemInsert.bind(this)}
								onDateChange={this.handleDateChange.bind(this)}
								// onEditDialogOpen={this.handleEditDialogOpen.bind(this)}
								>
								</Scheduler>
						</section>
					</div>
				</div>
			</div>
		);
	}
}



export default Calendar1;
	