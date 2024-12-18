import { LogsEvent as ProtoLogsEvent } from '@proto/ai/inworld/packets/packets_pb';

import { LogLevel } from '../../common/data_structures';

export class LogsEvent {
  readonly text: string;
  readonly level: LogLevel;
  readonly metadata: Record<string, string>;

  constructor({
    text,
    level,
    metadata,
  }: {
    text: string;
    level: LogLevel;
    metadata: Record<string, string>;
  }) {
    this.text = text;
    this.level = level;
    this.metadata = metadata;
  }

  static fromProto(proto: ProtoLogsEvent) {
    return new LogsEvent({
      text: proto.getText(),
      level: LogsEvent.getLogLevel(proto.getLevel()),
      metadata: Object.fromEntries(proto.getMetadataMap().entries()),
    });
  }

  private static getLogLevel(logLevel: ProtoLogsEvent.LogLevel) {
    switch (logLevel) {
      case ProtoLogsEvent.LogLevel.WARNING:
        return LogLevel.WARNING;
      case ProtoLogsEvent.LogLevel.INFO:
        return LogLevel.INFO;
      case ProtoLogsEvent.LogLevel.DEBUG:
        return LogLevel.DEBUG;
      case ProtoLogsEvent.LogLevel.INTERNAL:
        return LogLevel.INTERNAL;
      default:
        return LogLevel.UNSPECIFIED;
    }
  }
}
