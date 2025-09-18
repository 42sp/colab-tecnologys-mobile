import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { CalendarProvider, WeekCalendar } from 'react-native-calendars'
import { PieChart } from 'react-native-gifted-charts'
import Header from './header'
import { Calendar } from './calendar'
import { Activity } from './activity'

export default function ProductivityScreen() {
	return (
		<ScrollView className="flex-1">
			<Header />
			<Calendar />
			<Activity />
		</ScrollView>
	)
}
