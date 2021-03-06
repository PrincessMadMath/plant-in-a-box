using System;

namespace Core.Common
{
    public class OperationResult
    {
        public OperationResult(bool isSuccess, string failureReason, Exception? exception)
        {
            IsSuccess = isSuccess;
            FailureReason = failureReason;
            Exception = exception;
        }
        
        public bool IsSuccess { get; }

        public string FailureReason { get; }

        public Exception? Exception { get; }

        public static OperationResult Success()
        {
            return new OperationResult(true, string.Empty, null);
        }

        public static OperationResult Failure(string failureReason)
        {
            return new OperationResult(false, failureReason, null);
        }
        
        public static OperationResult Failure(string failureReason, Exception exception)
        {
            return new OperationResult(false, failureReason, exception);
        }
    }
}