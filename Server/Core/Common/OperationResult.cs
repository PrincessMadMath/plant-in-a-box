using System;

namespace Core.Common
{
    public class OperationResult
    {
        public OperationResult(bool isSuccess, string failureReason, Exception? exception)
        {
            this.IsSuccess = isSuccess;
            this.FailureReason = failureReason;
            this.Exception = exception;
        }

        public bool IsSuccess { get; }

        public string FailureReason { get; }

        public Exception? Exception { get; }

        public static OperationResult Success()
        {
            return new(true, string.Empty, null);
        }

        public static OperationResult Failure(string failureReason)
        {
            return new(false, failureReason, null);
        }

        public static OperationResult Failure(string failureReason, Exception exception)
        {
            return new(false, failureReason, exception);
        }
    }
}
