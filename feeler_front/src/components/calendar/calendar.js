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
		console.log(`Handle data change event: ${JSON.stringify(event, null, 2)}`);
		
		console.log(`Calendar: ${JSON.stringify(this.calendar, null, 2)}`);
		
		this.calendar.current.selectedDates = [event.detail.value];
	}

	init() {
	}

	componentDidMount() {
		this.init();
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
							<Scheduler ref={this.scheduler} id="scheduler" dataSource={this.data} view={this.view} views={this.views} nonworkingDays={this.nonworkingDays}
								firstDayOfWeek={this.firstDayOfWeek}
								//disableDateMenu={this.disableDateMenu}
								currentTimeIndicator={this.currentTimeIndicator}
								scrollButtonsPosition={this.scrollButtonsPosition} onDragEnd={this.updateData.bind(this)}
								onResizeEnd={this.updateData.bind(this)}
								onItemUpdate={this.updateData.bind(this)}
								onItemRemove={this.updateData.bind(this)}
								onDateChange={this.handleDateChange.bind(this)}></Scheduler>
						</section>
					</div>
				</div>
			</div>
		);
	}
}



export default Calendar1;
	