import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ThemedText } from '@/components/ThemedText';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedSwitch } from '@/components/ThemedSwitch';
import { ThemedDateTimePicker } from '@/components/ThemedDateTimePicker';
import { ThemedView } from '@/components/ThemedView';
import ThemedTextInput from '@/components/ThemedTextInput';

type NotificationFormProps = {
  onSend: (data: {
    title: string;
    body: string;
    startDate: Date;
    endDate?: Date;
    isSingleDay: boolean;
  }) => void;
};

export default function NotificationForm({ onSend }: NotificationFormProps) {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      startDate: new Date(),
      endDate: new Date(),
      isSingleDay: true,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Enter a title'),
      body: Yup.string().required('Enter a message'),
      startDate: Yup.date().required('Enter a start date'),
      endDate: Yup.date().when('isSingleDay', (isSingleDay, schema) => {
        return isSingleDay
          ? schema.notRequired()
          : schema
              .min(
                Yup.ref('startDate'),
                'End date cannot be before the start date',
              )
              .required('Enter an end date');
      }),
    }),

    onSubmit: (values) => {
      onSend(values);
    },
  });

  return (
    <ThemedView style={{ gap: 12 }}>
      <ThemedText>Title</ThemedText>
      <ThemedTextInput
        value={formik.values.title}
        onChangeText={formik.handleChange('title')}
        placeholder="Enter title"
      />
      {formik.errors.title && (
        <ThemedText style={{ color: 'red' }}>{formik.errors.title}</ThemedText>
      )}

      <ThemedText>Message</ThemedText>
      <ThemedTextInput
        value={formik.values.body}
        onChangeText={formik.handleChange('body')}
        placeholder="Enter message"
      />
      {formik.errors.body && (
        <ThemedText style={{ color: 'red' }}>{formik.errors.body}</ThemedText>
      )}

      <ThemedView
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}
      >
        <ThemedText>One day only:</ThemedText>
        <ThemedSwitch
          value={formik.values.isSingleDay}
          onValueChange={(val) => {
            formik.setFieldValue('isSingleDay', val);
          }}
        />
      </ThemedView>

      <ThemedButton
        title="Select start date"
        onPress={() => setShowStart(true)}
      />
      {showStart && (
        <ThemedDateTimePicker
          value={formik.values.startDate}
          mode="date"
          display="spinner"
          onChange={(_, selected) => {
            setShowStart(false);
            if (selected) formik.setFieldValue('startDate', selected);
          }}
        />
      )}
      <ThemedText>
        Start: {formik.values.startDate.toLocaleDateString()}
      </ThemedText>

      {!formik.values.isSingleDay && (
        <>
          <ThemedButton
            title="Select end date"
            onPress={() => setShowEnd(true)}
          />
          {showEnd && (
            <ThemedDateTimePicker
              value={formik.values.endDate}
              mode="date"
              display="spinner"
              onChange={(_, selected) => {
                setShowEnd(false);
                if (selected) formik.setFieldValue('endDate', selected);
              }}
            />
          )}
          <ThemedText>
            End: {formik.values.endDate.toLocaleDateString()}
          </ThemedText>
        </>
      )}

      <ThemedButton
        title="Send notification"
        onPress={formik.handleSubmit as any}
      />
    </ThemedView>
  );
}
