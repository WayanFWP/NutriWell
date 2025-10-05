import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SpeedometerProps {
  bmi: number;
  status: string;
}

export default function BMISpeedometer({ bmi, status }: SpeedometerProps) {
  const getBMIColor = (bmi: number) => {
    if (bmi < 16.0) return '#FF4444'; // Red
    if (bmi < 17.0) return '#FF8800'; // Orange
    if (bmi < 18.5) return '#FFAA00'; // Yellow-Orange
    if (bmi < 25.0) return '#4CAF50'; // Green (Normal)
    if (bmi < 30.0) return '#FFAA00'; // Yellow-Orange
    if (bmi < 35.0) return '#FF8800'; // Orange
    return '#FF4444'; // Red
  };

  const getBMIPosition = (bmi: number) => {
    // Convert BMI to percentage position (0-100%)
    const minBMI = 15;
    const maxBMI = 40;
    const normalizedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
    const position = ((normalizedBMI - minBMI) / (maxBMI - minBMI)) * 100;
    return position;
  };

  const getBMIAngle = (bmi: number) => {
    // Convert BMI to angle position (-90 to 90 degrees for semicircle)
    const minBMI = 15;
    const maxBMI = 40;
    const normalizedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
    const angle = ((normalizedBMI - minBMI) / (maxBMI - minBMI)) * 180 - 90;
    return angle;
  };

  return (
    <View style={styles.container}>
      <View style={styles.speedometerContainer}>
        {/* BMI Gauge */}
        <View style={styles.gaugeContainer}>
          {/* Color Bands */}
          <View style={styles.colorBands}>
            <View style={[styles.band, styles.bandRed]} />
            <View style={[styles.band, styles.bandOrange]} />
            <View style={[styles.band, styles.bandYellow]} />
            <View style={[styles.band, styles.bandGreen]} />
            <View style={[styles.band, styles.bandYellow]} />
            <View style={[styles.band, styles.bandOrange]} />
            <View style={[styles.band, styles.bandRed]} />
          </View>
          
          {/* Needle Indicator */}
          <View style={styles.needleContainer}>
            <View 
              style={[
                styles.needle,
                { left: `${getBMIPosition(bmi)}%` }
              ]}
            />
          </View>
        </View>
        
        {/* BMI Value */}
        <View style={styles.bmiValueContainer}>
          <Text style={styles.bmiValue}>{bmi}</Text>
          <Text style={styles.bmiLabel}>BMI</Text>
        </View>
      </View>
      
      {/* Status Badge */}
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: getBMIColor(bmi) }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  speedometerContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  gaugeContainer: {
    width: 200,
    height: 80,
    position: 'relative',
    marginBottom: 20,
  },
  colorBands: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  band: {
    flex: 1,
    height: '100%',
  },
  bandRed: {
    backgroundColor: '#FF4444',
  },
  bandOrange: {
    backgroundColor: '#FF8800',
  },
  bandYellow: {
    backgroundColor: '#FFAA00',
  },
  bandGreen: {
    backgroundColor: '#4CAF50',
  },
  needleContainer: {
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    height: 30,
    alignItems: 'center',
  },
  needle: {
    position: 'absolute',
    top: -5,
    width: 3,
    height: 30,
    backgroundColor: '#333',
    borderRadius: 1.5,
    transform: [{ translateX: -1.5 }],
  },
  bmiValueContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  bmiValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  bmiLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
