{{/*
Common labels
*/}}

{{- define "labels" -}} 
app: pib
service: {{ .Chart.Name }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}